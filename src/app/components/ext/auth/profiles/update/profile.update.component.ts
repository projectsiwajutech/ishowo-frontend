/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {AgencyService} from '../../../../services/agency/agency.service';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {ProfileService} from "../../../../services/profil/profil.service";
import {UserService} from "../../../../services/user/user.service";
import {Profil} from "../../../../models/profil/profil";
import {User} from "../../../../models/user/user";
import {Group} from "../../../../models/group/group";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-profile-update',
  templateUrl: './profile.update.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProfileUpdateComponent implements OnInit, OnChanges{

  visible: boolean = false;
  @Input() item: Profil ;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  agencies: Agency[] = [];
  users: User[]= [];
  groups: Group[]= [];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private profileService: ProfileService,
    private locStorService: LocalStorageService,
    private agencyService: AgencyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    //this.getAgencies();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.users.length !==0){this.selectUser();} else { this.getUsers(); }
    if(this.groups.length !==0){this.selectGroup();} else { this.getGroups(); }
    if(this.agencies.length !==0){this.selectAgency();} else { this.getAgencies(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.profileService.updateProfile(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;
          this.updated.emit("updated");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select a user
  selectUser(): void{
    if(this.users === null || this.users === undefined) return;
    if(this.users.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.user = this.users.filter( user => user.id === this.item.user.id)[0];
    }
  }//fin selectUser

  //select a group
  selectGroup(): void{
    if(this.groups === null || this.groups === undefined) return;
    if(this.groups.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.group = this.groups.filter( group => group.id === this.item.group.id)[0];
    }
  }//fin selectGroup

  //select a agency
  selectAgency(): void{
    if(this.agencies === null || this.agencies === undefined) return;
    if(this.agencies.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Profil();

      this.item.agency = this.agencies.filter( agency => agency.id === this.item.agency.id)[0];
    }
  }//fin selectAgency




  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
          this.selectAgency();
        },
        error => {
        }
      );
  }//fin getAgencies

  //get list of users
  getUsers(): void {
    this.users = [];
    this.userService.getAgents(this.user)
      .then(
        users => {
          this.users = users;
          this.selectUser();
        },
        error => {
        }
      );
  }//fin getUsers

  //get list of groups
  getGroups(): void {
    this.groups = [];
    this.userService.getGroups()
      .then(
        groups => {
          this.groups = groups;
          this.selectGroup();
        },
        error => {
        }
      );
  }//fin getGroups


}

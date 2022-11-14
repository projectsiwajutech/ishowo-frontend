/**
 * Created by Utilisateur on 26/03/2017.
 */

/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
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
import {Profil} from "../../../../models/profil/profil";
import {ProfileService} from "../../../../services/profil/profil.service";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/user/user";
import {Group} from "../../../../models/group/group";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-profile-create',
  templateUrl: './profile.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProfileCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Profil;
  agencies: Agency[];
  users: User[];
  groups: Group[];

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private profilService: ProfileService,
    private locStorService: LocalStorageService,
    private agencyService: AgencyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item = new Profil();
    this.getAgencies();
    this.getUsers();
    this.getGroups();
  }

  ngOnChanges(): void{
    this.item = new Profil();
  }//end ngOnChanges

  //create object
  save(form : any){
  this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.profilService.createProfile(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Profil();
          this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new Profil();
  }

  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
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
        },
        error => {
        }
      );
  }//fin getGroups



}

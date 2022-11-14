/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {Profil} from "../../../../models/profil/profil";
import {ProfileService} from "../../../../services/profil/profil.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']

})

export class ProfilesComponent implements OnInit{

  profiles : Profil[] = [] ;
  selectedUpObject: Profil;
  selectedDelObject: Profil;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private profileService: ProfileService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getProfiles();
  }

  //get list of profiles
  getProfiles(): void {
    this.isLoading = true;  this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
        this.isLoading = false;
        this.profiles = profiles;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getProfiles

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getProfiles();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getProfiles();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getProfiles();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Profil): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Profil): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate


  goBack(): void {
    this.location.back();
  }

}

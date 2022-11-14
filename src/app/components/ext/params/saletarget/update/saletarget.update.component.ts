/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {AgencyService} from '../../../../services/agency/agency.service';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {SaleTarget} from "../../../../models/saletarget/saletarget";
import {SaleTargetService} from "../../../../services/sale/saletarget.service";
import {ProfileService} from "../../../../services/profil/profil.service";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-saletarget-update',
  templateUrl: './saletarget.update.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class SaleTargetUpdateComponent implements OnInit, OnChanges{

  visible: boolean = false;
  @Input() item: SaleTarget ;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  profiles: Profil[];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private saleTargetService: SaleTargetService,
    private profileService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.profiles === undefined ){this.getProfiles();} else {  this.selectProfile(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.saleTargetService.updateSaleTarget(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;
          this.updated.emit("updated");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }//end save

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select a profile
  selectProfile(): void{
    if(this.profiles === null || this.profiles === undefined) return;
    if(this.profiles.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new SaleTarget();
      this.item.agent = this.profiles.filter( profile => profile.id === this.item.agent.id)[0];
    }
  }//fin selectProfile

  //get list of profiles
  getProfiles(): void {
    this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
          this.profiles = profiles;
          this.selectProfile();
        },
        error => {
        }
      );
  }//fin getProfiles

  //start date
  getSelectedDateStart(event: any): void{
    this.item.start_date = event;
  }//fin getSelectedDateStart

  //end date
  getSelectedDateEnd(event: any): void{
    this.item.end_date = event;
  }//fin getSelectedDateEnd


}

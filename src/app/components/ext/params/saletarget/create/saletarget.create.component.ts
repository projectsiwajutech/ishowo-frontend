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
  selector: 'it-saletarget-create',
  templateUrl: './saletarget.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class SaleTargetCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: SaleTarget;
  profiles: Profil[];

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

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
    this.item = new SaleTarget();
    this.getProfiles();
  }

  ngOnChanges(): void{
    this.item = new SaleTarget();
  }//end ngOnChanges

  //create object
  save(form : any){
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.saleTargetService.createSaleTarget(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new SaleTarget();
          this.created.emit("created");
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
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new SaleTarget();
  }

  //get list of profiles
  getProfiles(): void {
    this.profiles = [];
    this.profileService.getProfiles(this.user)
      .then(
        profiles => {
          this.profiles = profiles;
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

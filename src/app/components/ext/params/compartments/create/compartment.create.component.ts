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
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-compartment-create',
  templateUrl: './compartment.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class CompartmentCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Compartment;
  agencies: Agency[];

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private agencyService: AgencyService,
    private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item = new Compartment();
    this.getAgencies();
  }

  ngOnChanges(): void{
    this.item = new Compartment();
  }//end ngOnChanges

  //create object
  save(form : any){
	this.item = new Compartment(); this.item.name = form.name; this.item.agency = form.agency;
    this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.compartmentService.createCompartment(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Compartment();
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
    this.item = new Compartment();
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


}

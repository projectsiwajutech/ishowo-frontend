/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-compartments',
  templateUrl: './compartments.component.html',
  styleUrls: ['./compartments.component.css']

})

export class CompartmentComponent implements OnInit{

  compartments : Compartment[] = [] ;
  selectedUpObject: Compartment;
  selectedDelObject: Compartment;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getCompartments();
  }

  //get list of compartments
  getCompartments(): void {
    this.isLoading = true;  this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
        this.isLoading = false;
        this.compartments = compartments;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getCompartments

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getCompartments();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getCompartments();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getCompartments();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Compartment): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Compartment): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate


  goBack(): void {
    this.location.back();
  }

}

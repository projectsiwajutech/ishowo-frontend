

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {AgencyService} from '../../../../services/agency/agency.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']

})

export class AgencyComponent implements OnInit{

  agencies : Agency[] = [] ;
  selectedUpObject: Agency;
  selectedDelObject: Agency;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private agencyService: AgencyService,
    private locStorService: LocalStorageService,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getAgencies();
  }

  //get list of agencies
  getAgencies(): void {
    this.isLoading = true;  this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
      agencies => {
        this.isLoading = false;
        this.agencies = agencies;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getAgencies

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getAgencies();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getAgencies();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getAgencies();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Agency): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Agency): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate




  goBack(): void {
    this.location.back();
  }

}

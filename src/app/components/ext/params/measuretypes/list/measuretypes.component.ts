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

import {MeasureType} from '../../../../models/measuretype/measuretype';
import {MeasureTypeService} from '../../../../services/measuretype/measuretype.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-measuretypes',
  templateUrl: './measuretypes.component.html',
  styleUrls: ['./measuretypes.component.css']

})

export class MeasureTypeComponent implements OnInit{

  measureTypes : MeasureType[] = [] ;
  selectedUpObject: MeasureType;
  selectedDelObject: MeasureType;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getMeasureTypes();
  }

  //get list of agencies
  getMeasureTypes(): void {
    this.isLoading = true;  this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
        this.isLoading = false;
        this.measureTypes = measureTypes;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getMeasureTypes

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getMeasureTypes();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getMeasureTypes();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getMeasureTypes();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: MeasureType): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: MeasureType): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate

  goBack(): void {
    this.location.back();
  }

}

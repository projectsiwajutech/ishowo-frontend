/**
 * Created by Utilisateur on 26/03/2017.
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
import {SaleTarget} from "../../../../models/saletarget/saletarget";
import {SaleTargetService} from "../../../../services/sale/saletarget.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-saletarget',
  templateUrl: './saletarget.component.html',
  styleUrls: ['./saletarget.component.css']

})

export class SaleTargetComponent implements OnInit{

  saleTargetList : SaleTarget[] = [] ;
  selectedUpObject: SaleTarget;
  selectedDelObject: SaleTarget;

  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private saletargetService: SaleTargetService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
  private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getSaleTargetList();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of saletarget list
  getSaleTargetList(): void {
    this.isLoading = true;  this.saleTargetList = [];
    this.saletargetService.getSaleTargetList(this.user)
      .then(
        saletargetlist => {
        this.isLoading = false;
        this.saleTargetList = saletargetlist;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getSaleTargetList

  //search saletarget list
  searchData(): void {
    this.isLoading = true;  this.saleTargetList = [];
    this.saletargetService.searchSaleTarget(this.param)
      .then(
        saletargetlist => {
          this.isLoading = false;
          this.saleTargetList = saletargetlist;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchSaleTargetList

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getSaleTargetList();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getSaleTargetList();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getSaleTargetList();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: SaleTarget): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: SaleTarget): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate

  //start date
  getSelectedDateStart(event: any): void{
    this.param.startDate = event;
  }//fin getSelectedDateStart

  //end date
  getSelectedDateEnd(event: any): void{
    this.param.endDate = event;
  }//fin getSelectedDateEnd


  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin


  goBack(): void {
    this.location.back();
  }

}

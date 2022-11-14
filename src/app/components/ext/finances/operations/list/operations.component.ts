import { LibraryService } from './../../../../services/app/library.service';
import { PeriodParam } from './../../../../models/query/PeriodParam';
import { FinOperation } from './../../../../models/finoperation/finoperation';
/**
 * Created by Utilisateur on 01/06/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";
import {VirtualAccount} from "../../../../models/virtualaccount/virtualaccount";

@Component({
  selector: 'it-fin-operations',
  templateUrl: './operations.component.html',
  //styleUrls: ['banks.component.css']

})

export class FinancialOperationComponent implements OnInit{

  operations : FinOperation[] = [] ;
  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;
  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  constructor(
    private vAccountService: VirtualAccountService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getFinOperations();
       this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of finoperations
  getFinOperations(): void {
    this.isLoading = true;  this.operations = [];
    this.vAccountService.getFinOperations(this.user)
      .then(
        operations => {
          this.isLoading = false;
          this.operations = operations;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getFinOperations

    //get list of sales
  searchData(): void {
    this.isLoading = true;  this.operations = [];
    this.vAccountService.searchFinOperations(this.param)
      .then(
        operations => {
          this.isLoading = false;
          this.operations = operations;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getFinOperations();
  }//fin updateOnCreate

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

    //date de debut
  getSelectedDateStart(event: Date){
    this.param.startDate = event;
  }

  //date de fin
  getSelectedDateEnd(event: Date){
    this.param.endDate = event;
  }

  goBack(): void {
    this.location.back();
  }

}

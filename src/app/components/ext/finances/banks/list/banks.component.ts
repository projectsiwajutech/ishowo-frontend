/**
 * Created by Utilisateur on 01/06/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Bank} from "../../../../models/bank/bank";
import {BankService} from "../../../../services/bank/bank.service";

@Component({
  selector: 'it-banks',
  templateUrl: './banks.component.html',
  //styleUrls: ['banks.component.css']
})

export class BankComponent implements OnInit{

  banks : Bank[] = [] ;
  selectedUpObject: Bank;
  selectedDelObject: Bank;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private bankService: BankService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getBanks();
  }

  //get list of banks
  getBanks(): void {
    this.isLoading = true;  this.banks = [];
    this.bankService.getBanks(this.user)
      .then(
        banks => {
          this.isLoading = false;
          this.banks = banks;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getBanks

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getBanks();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getBanks();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getBanks();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Bank): void{
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Bank): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate


  goBack(): void {
    this.location.back();
  }

}

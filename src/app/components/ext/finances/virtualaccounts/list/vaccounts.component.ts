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
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";
import {VirtualAccount} from "../../../../models/virtualaccount/virtualaccount";

@Component({
  selector: 'it-vaccounts',
  templateUrl: './vaccounts.component.html',
  //styleUrls: ['banks.component.css']

})

export class VirtualAccountComponent implements OnInit{

  vaccounts : VirtualAccount[] = [] ;
  selectedUpObject: VirtualAccount;
  selectedDelObject: VirtualAccount;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private vAccountService: VirtualAccountService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getVirtualAccounts();
  }

  //get list of account
  getVirtualAccounts(): void {
    this.isLoading = true;  this.vaccounts = [];
    this.vAccountService.getVirtualAccounts(this.user)
      .then(
        banks => {
          this.isLoading = false;
          this.vaccounts = banks;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getVirtualAccounts

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getVirtualAccounts();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getVirtualAccounts();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getVirtualAccounts();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: VirtualAccount): void{
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: VirtualAccount): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate


  goBack(): void {
    this.location.back();
  }

}

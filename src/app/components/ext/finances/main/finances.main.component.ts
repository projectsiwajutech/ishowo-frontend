/**
 * Created by Utilisateur on 05/06/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'it-finances',
  templateUrl: './finances.main.component.html',
  //styleUrls: ['./orders.component.css']

})

export class FinancesMainComponent implements OnInit{



  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
  }

  //liste les banques
  listBanks(): void{
    let link = ['/app/fin_banks'];
    this.router.navigate(link);
  }//fin listBanks

  //liste les comptes
  listVirtualAccounts(): void{
    let link = ['/app/fin_vaccounts'];
    this.router.navigate(link);
  }//fin listVirtualAccounts

    //liste les operations
  listAccountsOperations(): void{
    let link = ['/app/fin_operations'];
    this.router.navigate(link);
  }//fin listAccountsOperations

  goBack(): void {
    this.location.back();
  }

}

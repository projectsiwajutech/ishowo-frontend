import { Router } from '@angular/router';
import { Licence } from './../../models/licence/licence';
import { StatsService } from './../stats/stats.service';
import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AccessService {



  constructor(private http: Http) {}

  ///check user authorization
  checkUserAuthorization(section: string, group: string) : boolean{
    let result: boolean = false;

    switch (group){
      case 'ADMIN':
        if(section === "ventes") result = true;
        if(section === "stock") result = true;
        if(section === "params") result = true;
        if(section === "stats") result = true;
        if(section === "secu") result = true;
        if(section === "finances") result = true;
        break;

      case 'CAISSE':
        if(section === "ventes") result = true;
        if(section === "stock") result = false;
        if(section === "params") result = false;
        if(section === "stats") result = false;
        if(section === "secu") result = false;
        if(section === "finances") result = false;
        break;

      case 'COMMANDES':
        if(section === "ventes") result = false;
        if(section === "stock") result = true;
        if(section === "params") result = false;
        if(section === "stats") result = false;
        if(section === "secu") result = false;
        if(section === "finances") result = false;
        break;
    }

    return result;
  }//fin checkUserAuthorization

  ///check if a module licence can give access to a module in the App
  isAllowedAccessToModule(section: string , licence: Licence): boolean{
    let visibility: boolean =  true;
    //for StatsService
      if(section === "stats" && licence.module === "MODULE_1"){ visibility =  false; }

    //FinancesMainComponent    //for StatsService
      if(section === "finances" && (licence.module === "MODULE_2" || licence.module === "MODULE_1") ){  visibility =  false; }

      //module stock 
      //if(section === "stock" ){ visibility =  true; }

    return visibility;
  }//fin isAllowedAccessToModule

  //can show Router
  canShowRoute(url: string, licence: Licence): boolean {
    let canShow = true;

    //stats
       if(licence.module === "MODULE_1" && (url === "/app/general_stats" ||   url === "/app/product_global_stats" || url === "/app/product_sold_stats" || 
         url === "/app/sellers_sales_stats" ||   url === "/app/customers_sales_stats" ||   url === "/app/customers"
        ) ){  canShow = false ;   }
    
    //finance
       if( (licence.module === "MODULE_2" || licence.module === "MODULE_1") && (url === "/app/fin_main" ||   url === "/app/fin_banks" 
       || url === "/app/fin_vaccounts" || url === "/app/fin_operations"
        ) ){  canShow = false ;   }

    return canShow;
  }//fin canShowRoute

}


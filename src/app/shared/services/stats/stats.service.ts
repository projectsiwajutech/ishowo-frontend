/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";
import {GlobalReport} from "../../models/stats/globalreport";
import {PeriodParam} from "../../models/query/PeriodParam";
import {ProductInStock} from "../../models/product/productinstock";
import {UserReport} from "../../models/stats/userreport";

@Injectable()
export class StatsService {

  private apiUrl : string;
  private headers : Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any){

    return Promise.reject(error.message || error);
  }

  //get current stats
  getCurrentStats(obj: Profil) : Promise<GlobalReport> {
    return this.http.post(`${this.apiUrl}stats/currentreport`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as GlobalReport)
      .catch(this.handleError);
  }//fin getCurrentStats

  //get period stats
  getPeriodGlobalStats(obj: PeriodParam) : Promise<GlobalReport> {
    return this.http.post(`${this.apiUrl}stats/periodglobalreport`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as GlobalReport)
      .catch(this.handleError);
  }//fin getPeriodGlobalStats

  //get product period stats
  getProductPeriodGlobalStats(obj: PeriodParam) : Promise<GlobalReport> {
    return this.http.post(`${this.apiUrl}stats/productperiodglobalreport`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as GlobalReport)
      .catch(this.handleError);
  }//fin getProductPeriodGlobalStats

  //get product sold by quantity stats
  getProductSoldByQuantityStats(obj: PeriodParam) : Promise<ProductInStock[]> {
    return this.http.post(`${this.apiUrl}stats/mostsoldprodbyqty`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getProductSoldByQuantityStats

  //get product sold by ca stats
  getProductSoldByCaStats(obj: PeriodParam) : Promise<ProductInStock[]> {
    return this.http.post(`${this.apiUrl}stats/mostsoldprodbyca`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getProductSoldByCaStats

  //get product sold by profit stats
  getProductSoldByProfitStats(obj: PeriodParam) : Promise<ProductInStock[]> {
    return this.http.post(`${this.apiUrl}stats/mostsoldprodbyprofit`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getProductSoldByProfitStats

  //get sales report by sellers
  getSalesBySellersStats(obj: PeriodParam) : Promise<UserReport[]> {
    return this.http.post(`${this.apiUrl}stats/salesreportbysellers`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as UserReport[])
      .catch(this.handleError);
  }//fin getSalesBySellersStats

  //get sales report by customers
  getSalesByCustomersStats(obj: PeriodParam) : Promise<UserReport[]> {
    return this.http.post(`${this.apiUrl}stats/salesreportbycustomers`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as UserReport[])
      .catch(this.handleError);
  }//fin getSalesByCustomersStats

}


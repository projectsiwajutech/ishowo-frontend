/**
 * Created by Utilisateur on 21/05/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppService }           from '../../services/app/app.service';
import {Sale} from "../../models/sale/sale";
import {FileObject} from "../../models/fileobject/FileObject";
import {Profil} from "../../models/profil/profil";
import {PeriodParam} from "../../models/query/PeriodParam";
import {SaleTarget} from "../../models/saletarget/saletarget";

@Injectable()
export class SaleTargetService {

  private apiUrl : string;
  private headers : Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any){
    return Promise.reject(error.message || error);
  }

  //get saletarget list
  getSaleTargetList(obj: Profil) : Promise<SaleTarget[]> {
    return this.http.get(`${this.apiUrl}params/saletargetlist/${obj.id}`)
      .toPromise()
      .then(response => response.json() as SaleTarget[])
      .catch(this.handleError);
  }//fin getSaleTargetList

  //search saletarget list
  searchSaleTarget(obj: PeriodParam) : Promise<SaleTarget[]> {
    return this.http.post(`${this.apiUrl}params/searchsaletargetlist`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as SaleTarget[])
      .catch(this.handleError);
  }//fin searchSaleTarget

  //create sale target
  createSaleTarget(obj: SaleTarget) : Promise<SaleTarget> {
    return this.http
      .post(`${this.apiUrl}params/createsaletarget`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as SaleTarget)
      .catch(this.handleError);
  }//fin createSaleTarget

//update category
  updateSaleTarget(obj: SaleTarget) : Promise<SaleTarget> {
    return this.http
      .put(`${this.apiUrl}params/updatesaletarget`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as SaleTarget)
      .catch(this.handleError);
  }//fin updateSaleTarget

  //delete category
  deleteSaleTarget(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletesaletarget/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteSaleTarget

}


/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppService } from '../../services/app/app.service';
import { Sale } from "../../models/sale/sale";
import { FileObject } from "../../models/fileobject/FileObject";
import { Profil } from "../../models/profil/profil";
import { PeriodParam } from "../../models/query/PeriodParam";
import { RequestOptions } from '@angular/http';
import { ResponseContentType } from '@angular/http';
import { ParamMecef } from '../../models/paramMecef/paramMecef';
import { UpdateMecef } from '../../models/updateMecef/updateMecef';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SaleService {

  private apiUrl: string;
  private headers: Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  //get sales list
  getSales(obj: Profil): Promise<Sale[]> {
    return this.http.get(`${this.apiUrl}stock/sales/${obj.id}`)
      .toPromise()
      .then(response => response.json() as Sale[])
      .catch(this.handleError);
  }//fin getSales

  //create sale
  createSale(obj: Sale): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http
      .post(`${this.apiUrl}stock/createsale`, JSON.stringify(obj), options)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }//fin createSale

  //cancel sale
  cancelSale(obj: Sale): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;
    return this.http
      .post(`${this.apiUrl}mecef/cancelinvoice`, JSON.stringify(obj), options)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }//fin cancelSale

  //search sales list
  searchSales(obj: PeriodParam): Promise<Sale[]> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}stock/searchsales`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Sale[])
      .catch(this.handleError);
  }//fin searchSales

  //print sales list
  printSales(obj: PeriodParam): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printsales`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printSales

  //print sale item
  printSale(obj: Sale): Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printsale`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printSale

  //create devis
  createDevis(obj: Sale): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http
      .post(`${this.apiUrl}stock/createdevis`, JSON.stringify(obj), options)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }//fin createDevis

  //get devis list
  getDevis(obj: Profil): Promise<Sale[]> {
    return this.http.get(`${this.apiUrl}stock/devis/${obj.id}`)
      .toPromise()
      .then(response => response.json() as Sale[])
      .catch(this.handleError);
  }//fin getDevis

  //search devis list
  searchDevis(obj: PeriodParam): Promise<Sale[]> {
    return this.http.post(`${this.apiUrl}stock/searchdevis`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Sale[])
      .catch(this.handleError);
  }//fin searchDevis

  //print devis item
  printDevis(obj: Sale): Promise<FileObject> {
    return this.http.post(`${this.apiUrl}report/printdevis`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as FileObject)
      .catch(this.handleError);
  }//fin printDevis

  //pay balance
  payBalance(obj: Sale): Promise<Sale> {
    return this.http.post(`${this.apiUrl}stock/paysalebalance`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Sale)
      .catch(this.handleError);
  }//fin payBalance

  //get params Mecef list
  getParamsMecef(obj: Profil): Promise<ParamMecef[]> {
    return this.http.get(`${this.apiUrl}mecef/paramsmecef/${obj.id}`)
      .toPromise()
      .then(response => response.json() as ParamMecef[])
      .catch(this.handleError);
  }//fin getParamsMecef

  //update Mecef Params
  updateMecefParams(obj: UpdateMecef): Promise<UpdateMecef> {
    return this.http
      .put(`${this.apiUrl}mecef/updateparammecef`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as UpdateMecef)
      .catch(this.handleError);
  }//fin Update Mecef Params

}


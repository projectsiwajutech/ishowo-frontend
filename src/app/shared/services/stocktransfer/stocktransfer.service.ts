import { Headers, Http, ResponseContentType, RequestOptions } from '@angular/http';
/**
 * Created by Utilisateur on 12/04/2017.
 */

/**
 * Created by Utilisateur on 26/03/2017.
 */

import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppService }           from '../../services/app/app.service';
import {PeriodParam} from "../../models/query/PeriodParam";
import {Profil} from "../../models/profil/profil";
import {StockTransfer} from "../../models/stocktransfer/stocktransfer";
import {FileObject} from "../../models/fileobject/FileObject";

@Injectable()
export class StockTransferService {

  private apiUrl : string;
  private headers : Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any){
    //console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //create product transfer between compartments
  createTransfer(obj: StockTransfer) : Promise<StockTransfer> {
    return this.http
      .post(`${this.apiUrl}stock/createtransfer`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as StockTransfer)
      .catch(this.handleError);
  }//fin createTransfer

  //get transfer list
  getTransferList(obj: Profil) : Promise<StockTransfer[]> {
    return this.http.get(`${this.apiUrl}stock/stocktransfers/${obj.id}`)
      .toPromise()
      .then(response => response.json() as StockTransfer[])
      .catch(this.handleError);
  }//fin getTransferList

  //search transfer list
  searchTransfers(obj: PeriodParam) : Promise<StockTransfer[]> {
    return this.http.post(`${this.apiUrl}stock/searchstocktransfers`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as StockTransfer[])
      .catch(this.handleError);
  }//fin searchTransfers

  //print transfer list
  printTransfers(obj: PeriodParam) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;
    return this.http.post(`${this.apiUrl}report/printtransfers`, JSON.stringify(obj),options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printTransfers

  //print transfer item
  printTransfer(obj: StockTransfer) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;
    return this.http.post(`${this.apiUrl}report/printtransfer`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printTransfer
}


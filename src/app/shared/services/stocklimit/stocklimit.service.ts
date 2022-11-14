/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppService }           from '../../services/app/app.service';
import {StockLimit} from "../../models/stocklimit/stocklimit";
import {ProdOnAlert} from "../../models/product/prodonalert";
import {ProdMeasureType} from "../../models/prodmeasuretype/prodmeasuretype";
import {Profil} from "../../models/profil/profil";
import {ProductInStock} from "../../models/product/productinstock";
import { ProdStockLimit } from '../../models/prodstocklimit';

@Injectable()
export class StockLimitService {

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

  //get stocklimit list
  getStockLimit(agent: Profil) : Promise<ProdStockLimit[]> {
    return this.http.get(`${this.apiUrl}stock/stocklimit/${agent.id}`)
      .toPromise()
      .then(response => response.json() as ProdStockLimit[])
      .catch(this.handleError);
  }//fin getStockLimit

  //get prod understock limit list
  getProdUnderStockLimit(agent: Profil) : Promise<ProductInStock[]> {
    return this.http.get(`${this.apiUrl}stock/understockproducts/${agent.id}`)
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getProdUnderStockLimit

  //create stocklimit
  createStockLimit(obj: ProdStockLimit) : Promise<ProdStockLimit> {
    return this.http
      .post(`${this.apiUrl}stock/createstocklimit`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ProdStockLimit)
      .catch(this.handleError);
  }//fin createStockLimit

  //update stocklimit
  updateStockLimit(obj: ProdStockLimit) : Promise<ProdStockLimit> {
    return this.http
      .put(`${this.apiUrl}stock/updatestocklimit`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ProdStockLimit)
      .catch(this.handleError);
  }//fin updateStockLimit

  //delete stocklimit
  deleteStockLimit(id: number): Promise<void> {
    const url = `${this.apiUrl}stock/deletestocklimit/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteStockLimit


}


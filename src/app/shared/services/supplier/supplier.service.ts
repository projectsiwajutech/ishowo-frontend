/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Supplier }           from '../../models/supplier/supplier';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class SupplierService {

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

  //get suppliers list
  getSuppliers(agent: Profil) : Promise<Supplier[]> {
    return this.http.get(`${this.apiUrl}params/suppliers/${agent.id}`)
    //.map(response => response.json().data as Agency[])
      .toPromise()
      .then(response => response.json() as Supplier[])
      .catch(this.handleError);
  }//fin getAgencies

  //create supplier
  createSupplier(obj: Supplier) : Promise<Supplier> {
    return this.http
      .post(`${this.apiUrl}params/createsupplier`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Supplier)
      .catch(this.handleError);
  }//fin createSupplier

  //update supplier
  updateSupplier(obj: Supplier) : Promise<Supplier> {
    return this.http
      .put(`${this.apiUrl}params/updatesupplier`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Supplier)
      .catch(this.handleError);
  }//fin updateSupplier

  //delete supplier
  deleteSupplier(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletesupplier/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteSupplier


}


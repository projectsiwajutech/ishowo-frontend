


import { Injectable } from '@angular/core';
import { Headers, Http, Response }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Bank }           from '../../models/bank/bank';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class BankService {

  private apiUrl : string;
  private headers : Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any){
    return Promise.reject(error.message || error);
  }

  //get banks list
  getBanks(agent: Profil) : Promise<Bank[]> {
    return this.http.get(`${this.apiUrl}params/banks/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Bank[])
      .catch(this.handleError);
  }//fin getBanks

  //create bank
  createBank(obj: Bank) : Promise<Bank> {
    return this.http
      .post(`${this.apiUrl}params/createbank`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Bank)
      .catch(this.handleError);
  }//fin createBank

  //update bank
  updateBank(obj: Bank) : Promise<Bank> {
    return this.http
      .put(`${this.apiUrl}params/updatebank`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Bank)
      .catch(this.handleError);
  }//fin updateBank


  //delete bank
  deleteBank(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletebank/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteBank


}


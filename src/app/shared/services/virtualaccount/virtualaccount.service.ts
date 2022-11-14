
import { PeriodParam } from './../../models/query/PeriodParam';
import { FinOperation } from './../../models/finoperation/finoperation';

import { Injectable } from '@angular/core';
import { Headers, Http }  from '@angular/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

import { Supplier }           from '../../models/supplier/supplier';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";
import {VirtualAccount} from "../../models/virtualaccount/virtualaccount";
import {AccountType} from "../../models/accounttype/accounttype";

@Injectable()
export class VirtualAccountService {

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

  //get virtual account list
  getVirtualAccounts(agent: Profil) : Promise<VirtualAccount[]> {
    return this.http.get(`${this.apiUrl}finances/vaccounts/${agent.id}`)
      .toPromise()
      .then(response => response.json() as VirtualAccount[])
      .catch(this.handleError);
  }//fin getVirtualAccounts

  //create virtual account
  createVirtualAccount(obj: VirtualAccount) : Promise<VirtualAccount> {
    return this.http
      .post(`${this.apiUrl}finances/createvaccount`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as VirtualAccount)
      .catch(this.handleError);
  }//fin createVirtualAccount

  //update virtual account
  updateVirtualAccount(obj: VirtualAccount) : Promise<VirtualAccount> {
    return this.http
      .put(`${this.apiUrl}finances/updatevaccount`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as VirtualAccount)
      .catch(this.handleError);
  }//fin updateVirtualAccount

  //delete virtual account
  deleteVirtualAccount(id: number): Promise<void> {
    const url = `${this.apiUrl}finances/deletevaccount/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteVirtualAccount

  //get account types list
  getAccountTypes(agent: Profil) : Promise<AccountType[]> {
    return this.http.get(`${this.apiUrl}params/accounttypes/${agent.id}`)
      .toPromise()
      .then(response => response.json() as AccountType[])
      .catch(this.handleError);
  }//fin getAccountTypes

  getOperationTypes(): string[]{
    let opTypes: string[] = [];
    opTypes.push("DEPOT");
    opTypes.push("RETRAIT");
    //opTypes.push(TypeFinOperation.DEPOT);
    return opTypes;
  }//fin getOperationTypes

    //get finoperations list
  getFinOperations(agent: Profil) : Promise<FinOperation[]> {
    return this.http.get(`${this.apiUrl}finances/finoperations/${agent.id}`)
      .toPromise()
      .then(response => response.json() as FinOperation[])
      .catch(this.handleError);
  }//fin getFinOperations

    //search finoperations list
  searchFinOperations(obj: PeriodParam) : Promise<FinOperation[]> {
    return this.http.post(`${this.apiUrl}finances/searchfinoperations`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as FinOperation[])
      .catch(this.handleError);
  }//fin searchFinOperations


  //create fin operations
  createFinOperation(obj: FinOperation) : Promise<FinOperation> {
    return this.http
      .post(`${this.apiUrl}finances/createfinoperation`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as FinOperation)
      .catch(this.handleError);
  }//fin createFinOperation

}


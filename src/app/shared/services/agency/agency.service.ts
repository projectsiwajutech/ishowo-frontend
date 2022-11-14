


import { Injectable } from '@angular/core';
import { Headers, Http, Response }       from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Agency }           from '../../models/agency/agency';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class AgencyService {

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

  //get agencies list
  getAgencies(agent: Profil) : Promise<Agency[]> {
    return this.http.get(`${this.apiUrl}params/agencies/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Agency[])
      .catch(this.handleError);
  }//fin getAgencies

  //create agency
  createAgency(obj: Agency) : Promise<Agency> {
    return this.http
      .post(`${this.apiUrl}params/createagency`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Agency)
      .catch(this.handleError);
  }//fin createAgency

  //update agency
  updateAgency(obj: Agency) : Promise<Agency> {
    return this.http
      .put(`${this.apiUrl}params/updateagency`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Agency)
      .catch(this.handleError);
  }//fin updateAgency


  //delete agency
  deleteAgency(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deleteagency/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteAgency


}


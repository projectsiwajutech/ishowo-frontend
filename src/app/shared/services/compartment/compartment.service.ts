/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Compartment }           from '../../models/compartment/compartment';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class CompartmentService {

  private apiUrl : string;
  private headers : Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any){
    return Promise.reject(error.message || error);
  }

  //get agencies list
  getCompartments(agent: Profil) : Promise<Compartment[]> {
    return this.http.get(`${this.apiUrl}params/compartments/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Compartment[])
      .catch(this.handleError);
  }//fin getCompartments

  //create compartment
  createCompartment(obj: Compartment) : Promise<Compartment> {
    return this.http
      .post(`${this.apiUrl}params/createcompartment`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Compartment)
      .catch(this.handleError);
  }//fin createCompartment

  //update compartment
  updateCompartment(obj: Compartment) : Promise<Compartment> {
    return this.http
      .put(`${this.apiUrl}params/updatecompartment`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Compartment)
      .catch(this.handleError);
  }//fin updateCompartment


  //delete agency
  deleteCompartment(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletecompartment/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteCompartment


}


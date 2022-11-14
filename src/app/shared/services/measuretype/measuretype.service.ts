/**
 * Created by Utilisateur on 28/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MeasureType }           from '../../models/measuretype/measuretype';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class MeasureTypeService {

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

  //get categories list
  getMeasureTypes(agent: Profil) : Promise<MeasureType[]> {
    return this.http.get(`${this.apiUrl}params/measuretypes/${agent.id}`)
      .toPromise()
      .then(response => response.json() as MeasureType[])
      .catch(this.handleError);
  }//fin getMeasureTypes

  //create measuretype
  createMeasureType(obj: MeasureType) : Promise<MeasureType> {
    return this.http
      .post(`${this.apiUrl}params/createmeasuretype`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as MeasureType)
      .catch(this.handleError);
  }//fin createCategory

  //update measuretype
  updateMeasureType(obj: MeasureType) : Promise<MeasureType> {
    return this.http
      .put(`${this.apiUrl}params/updatemeasuretype`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as MeasureType)
      .catch(this.handleError);
  }//fin updateCategory


  //delete measuretype
  deleteMeasureType(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletemeasuretype/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteMeasureType


}


/**
 * Created by Utilisateur on 28/03/2017.
 */
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

import { Category }           from '../../models/category/category';
import { AppService }           from '../../services/app/app.service';
import {Profil} from "../../models/profil/profil";

@Injectable()
export class CategoryService {

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
  getCategories(agent: Profil) : Promise<Category[]> {
    return this.http.get(`${this.apiUrl}params/categories/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }//fin getCategories

  //create category
  createCategory(obj: Category) : Promise<Category> {
    return this.http
      .post(`${this.apiUrl}params/createcategory`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Category)
      .catch(this.handleError);
  }//fin createCategory

  //update category
  updateCategory(obj: Category) : Promise<Category> {
    return this.http
      .put(`${this.apiUrl}params/updatecategory`, JSON.stringify(obj), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Category)
      .catch(this.handleError);
  }//fin updateCategory


  //delete category
  deleteCategory(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deletecategory/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteCategory


}


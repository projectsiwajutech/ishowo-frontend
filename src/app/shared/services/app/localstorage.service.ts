import { GroupeHandler } from 'src/app/shared/models/groupe_handler/groupe_handler';
/**
 * Created by Utilisateur on 31/03/2017.
 */

/**
 * Created by Utilisateur on 29/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Profil } from "../../models/profil/profil";



@Injectable()
export class LocalStorageService {

  constructor(private http: Http) { }

  //enregistre un utilisateur connecte
  saveUser(obj: Profil): void {
    this.saveToSession("M_ITCOMMERCE_APP_USER", obj);
  };
  //retourne un user
  getUser(): Profil {
    return this.readFromSession("M_ITCOMMERCE_APP_USER");
  };

  //enregistre un utilisateur connecte
  saveGroup(obj: GroupeHandler): void {
    this.saveToSession("M_ITCOMMERCE_APP_GROUP", obj);
  };
  //retourne un user
  getGroup(): GroupeHandler {
    return this.readFromSession("M_ITCOMMERCE_APP_GROUP");
  };

  saveToSession(key: string, value: any): void {
    var stringified = JSON.stringify(value);
    var jsonValue = btoa(stringified);
    localStorage.setItem(key, jsonValue);
  };

  readFromSession(key: any): any {
    var result = null;
    try {
      var json = localStorage.getItem(key);
      var result = JSON.parse(atob(json));
    } catch (e) {
      result = null;
    }
    return result;
  };

}


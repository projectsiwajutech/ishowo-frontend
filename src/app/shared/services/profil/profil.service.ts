import { Group } from './../../models/group/group';
import { GroupeHandler } from 'src/app/shared/models/groupe_handler/groupe_handler';

/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Supplier } from '../../models/supplier/supplier';
import { AppService } from '../../services/app/app.service';
import { Profil } from "../../models/profil/profil";
import { Company } from "../../models/company/company";
import { Module } from "../../models/module/module";
import { LicenceRequest } from "../../models/licence/licence.request";
import { Licence } from "../../models/licence/licence";
import { Formule } from '../../models/formule/formule';
import { Requestpay } from '../../models/requestpay/requestpay';

@Injectable()
export class ProfileService {
  
  private apiUrl: string;
  private licenceUrl: string;
  private headers: Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.licenceUrl = appService.getLicenceUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  //get url api
  getApiUrl(): Promise<any> {
    return this.http.get(`${this.apiUrl}licence/apiurl`)
      .toPromise()
      .then(response => response.json() as Profil[])
      .catch(this.handleError);
  }//fin getApiUrl

  //get profile list
  getProfiles(agent: Profil): Promise<Profil[]> {
    return this.http.get(`${this.apiUrl}auth/profiles/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Profil[])
      .catch(this.handleError);
  }//fin getProfiles

  //create profile
  createProfile(obj: Profil): Promise<Profil> {
    return this.http
      .post(`${this.apiUrl}auth/createprofile`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin createProfile

  //update profile
  updateProfile(obj: Profil): Promise<Profil> {
    return this.http
      .put(`${this.apiUrl}auth/updateprofile`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin updateProfile

  //update company details
  updateCompanyProfile(obj: Company): Promise<Company> {
    return this.http
      .put(`${this.apiUrl}auth/updatecompanyprofile`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Company)
      .catch(this.handleError);
  }//fin updateCompanyProfile

  //delete profile
  deleteProfile(id: number): Promise<void> {
    const url = `${this.apiUrl}auth/deleteprofile/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteProfile

  //login
  login(obj: Profil): Promise<Profil> {
    return this.http
      .post(`${this.apiUrl}auth/signin`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin login

  //get userbycode
  getUserByCode(code: string): Promise<Profil> {
    return this.http
      .post(`${this.apiUrl}licence/activeprofile`, JSON.stringify(code), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin getUserByCode

  //update profile
  updateConnectedUserProfile(obj: Profil): Promise<Profil> {
    return this.http
      .put(`${this.apiUrl}auth/updateuserprofile`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin updateConnectedUserProfile

  //refresh tic
  refreshTic(obj: Profil): Promise<Profil> {
    return this.http
      .get(`${this.apiUrl}auth/tic`)
      .toPromise()
      .then(res => res.json() as Profil)
      .catch(this.handleError);
  }//fin refreshTic

    //pay fedapay
    payrequest(obj: Requestpay) {
      return this.http
        .post(`${this.apiUrl}paymentfedapay/createPayment`, JSON.stringify(obj), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Requestpay)
        .catch(this.handleError);
    }//fin pay fedapay
    

  //get modules list
  getModules(): Promise<Module[]> {
    return this.http.get(`${this.licenceUrl}modules`)
      .toPromise()
      .then(response => response.json() as Module[])
      .catch(this.handleError);
  }//fin getModules

  //get formules list
  getFormules(): Promise<Formule[]> {
    return this.http.get(`${this.licenceUrl}formules`)
      .toPromise()
      .then(response => response.json() as Formule[])
      .catch(this.handleError);
  }//fin getFormules

  //get modules list fu
  getModulesFu(): Promise<Module[]> {
    return this.http.get(`${this.licenceUrl}modulesfu`)
      .toPromise()
      .then(response => response.json() as Module[])
      .catch(this.handleError);
  }//fin getModulesFu

  //get fprint
  getFPrint(): Promise<string> {
    return this.http.get(`${this.licenceUrl}fprint`)
      .toPromise()
      .then(response => response.text() as string)
      .catch(this.handleError);
  }//fin getFPrint

  //get last licence
  getLastLicence(): Promise<any> {
    return this.http.get(`${this.apiUrl}params/currentliccode`)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }//fin getLastLicence

  //get last licence for update
  getLastLicenceForUpdate(): Promise<any> {
    return this.http.get(`${this.apiUrl}licence/currentliccode`)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }//fin getLastLicenceForUpdate

  //ask for licene
  askForLicenceNew(obj: LicenceRequest): Promise<any> {
    return this.http
      .post(`${this.licenceUrl}licence/new`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }//fin askForLicenceNew

  //save licene
  saveLicence(obj: Licence): Promise<Licence> {
    return this.http
      .post(`${this.licenceUrl}new`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Licence)
      .catch(this.handleError);
  }//fin saveLicence

  //ask for licene
  askForLicenceUpdate(obj: LicenceRequest): Promise<any> {
    return this.http
      .put(`${this.licenceUrl}licence/change`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }//fin askForLicenceUpdate

  //save licene
  updateLicenceChange(obj: Licence): Promise<Licence> {
    return this.http
      .post(`${this.apiUrl}licence/licencechange`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Licence)
      .catch(this.handleError);
  }//fin updateLicenceChange

  //get current licence
  getCurrentLicence(): Promise<Licence> {
    return this.http.get(`${this.apiUrl}params/currentlicence`)
      .toPromise()
      .then(response => response.json() as Licence)
      .catch(this.handleError);
  }//fin getLicence

  

  //get group roles for user
  getGroupRoles(group: Group): Promise<GroupeHandler> {
    return this.http.get(`${this.apiUrl}params/groupwithroles/${group.id}`)
      .toPromise()
      .then(response => response.json() as GroupeHandler)
      .catch(this.handleError);
  }//fin getGroupRoles

    //get group roles for user
   saveVerification(token: string){
      return this.http.get(`${this.apiUrl}auth/verification/${token}`)
        .toPromise()
        .then(response => response.json() as GroupeHandler)
        .catch(this.handleError);
    }//fin getGroupRoles

  //get crypted Passwoed
  cryptPassword(password: any): Promise<string> {
    return this.http.get(`${this.apiUrl}params/cryptuserpass/${password}`)
      .toPromise()
      .then(response => response.text() as string)
      .catch(this.handleError);
  }//fin crypted Password
}


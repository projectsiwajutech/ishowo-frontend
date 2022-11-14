/**
 * Created by Utilisateur on 26/03/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Profil} from "../../../../models/profil/profil";
import {UserService} from "../../../../services/user/user.service";
import {ProfileService} from "../../../../services/profil/profil.service";
import {LibraryService} from "../../../../services/app/library.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Module} from "../../../../models/module/module";
import {LicenceRequest} from "../../../../models/licence/licence.request";
import {Licence} from "../../../../models/licence/licence";
import {Company} from "../../../../models/company/company";
import {User} from "../../../../models/user/user";


@Component({
  selector: 'it-licence-change',
  templateUrl: './licence.change.component.html',
  styleUrls: ['./licence.change.component.css']

})

export class LicenceChangeComponent implements OnInit{

  isLoading: boolean = false; isLicenceOk: boolean = false;
  modulesList: Module;
  fprint: string;
  request: LicenceRequest = new LicenceRequest();
  iLicence: Licence = new Licence();

  //user connected
  user: Profil;

  constructor(
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
     }

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getModulesList(); this.getFPrint(); this.getCurrentLicence();
  }

  //can user ask licence
  canUserAskLicence(){
    let status: boolean = false;
    status = (this.request.module !== undefined)
      && (this.request.code !== undefined && this.request.code !== "")
      && (this.request.fprint !== undefined && this.request.fprint !== "");
    return status;

  }//fin canUserAskLicence

  //refresh
  refresh(){
    this.getFPrint();
    this.getCurrentLicence();
  }//fin refresh

  //get fprint
  getFPrint(): void {
    this.profilService.getFPrint()
      .then( (result: any) => {
          this.fprint = result.name;
          this.request.fprint = this.fprint;
        },
        (error: any) => {
        }
      );
  }//fin getFPrint

  //get current licence code
  getCurrentLicence(): void {
    this.profilService.getLastLicence()
      .then( (result: any) => {
          this.request.code = result.name;
        },
        (error: any) => {
        }
      );
  }//fin getCurrentLicence

  //get modules list
  getModulesList(): void {
    this.profilService.getModulesFu()
      .then( (result: any) => {
          this.modulesList = result.data;
        },  (error: any) => { }
      );
  }//fin getModulesList


  //get description
  getDescription(){
    if(this.request.module === null || this.request.module === undefined) return "";
    return this.request.module.description;
  }//fin getDescription

  //ask for licence
  askForLicence(): void {
    this.isLoading = true;
    this.request.fprint = this.fprint;

    this.profilService.askForLicenceUpdate(this.request)
      .then(
        result => {
          if(result.status === "success"){
            //fill the rest of data
            this.iLicence.code = result.code_client;
            this.iLicence.key = result.alea;
            this.iLicence.activationDate = result.date_activation.date;
            this.iLicence.activationCost = this.request.module.montant;
            this.iLicence.module = this.request.module.nom;
            this.iLicence.expiryDate = result.date_expiration.date;

            this.saveLicence(this.iLicence); return;

          }else{
            this.isLoading = false;
            this.libraryService.showMessage(result.message); return;
          }
        },
        error => {
          this.isLoading = false;
          if(error.status === 401){
            this.libraryService.showMessage(error._body); return;
          }else{
            this.libraryService.showMessage("Une erreur est survenue lors de la connexion"); return;
          }
        }
      );
  }//fin askForLicence

  //savelicence
  saveLicence(obj: Licence): void {
    this.profilService.updateLicenceChange(obj)
      .then(
        result => {
          this.iLicence.key = "";
          this.isLoading = false;
          if(result === null){
            this.libraryService.showMessage("Une erreur est survenue"); return;
          }else{
            this.isLicenceOk = true;
            this.iLicence = result;
            this.request = new LicenceRequest();
            this.libraryService.showMessage("Votre licence a été mise à jour"); return;
          }
        },
        error => {
          this.isLoading = false;
          if(error.status === 401){
            this.libraryService.showMessage(error._body); return;
          }else{
            this.libraryService.showMessage("Une erreur est survenue."); return;
          }
        }
      );
  }//fin saveLicence

  //login now
  loginNow(): void{
    let link = ['/login'];
    this.router.navigate(link);
  }//fin loginNow

  //get licence status
  getLicenceStatus(status: boolean): string{
      if(status === true) return "ACTIVEE";
    else return "INACTIVE";
  }//fin getLicenceStatus

}

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
  selector: 'it-licence-new',
  templateUrl: './licence.new.component.html',
  styleUrls: ['./licence.new.component.css']

})

export class LicenceNewComponent implements OnInit{

  isLoading: boolean = false; isLicenceOk: boolean = false;
  modulesList: Module;
  fprint: string;
  request: LicenceRequest = new LicenceRequest();
  iLicence: Licence = new Licence();

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
    this.getModulesList(); this.getFPrint();
  }

  //can user ask licence
  canUserAskLicence(){
    let status: boolean = false;
    status = (this.request.nom_company !== "" && this.request.nom_company !== undefined)
    && (this.request.adresse_company !== "" && this.request.adresse_company !== undefined)
      && (this.request.telephone_company !== "" && this.request.telephone_company !== undefined)
      && (this.request.secteur !== "" && this.request.secteur !== undefined)

      && (this.request.nom_admin !== "" && this.request.nom_admin !== undefined)
      && (this.request.prenom_admin !== "" && this.request.prenom_admin !== undefined)
      && (this.request.telephone_admin !== "" && this.request.telephone_admin !== undefined)
      && (this.request.module !== undefined)

      && (this.request.fprint !== undefined && this.request.fprint !== "");

    return status;

  }//fin canUserAskLicence

  //refresh
  refresh(){
      this.getFPrint();
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

  //get modules list
  getModulesList(): void {
    this.profilService.getModules()
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
    //company
    let company: Company = new Company();
    company.name = this.request.nom_company; company.address = this.request.adresse_company;
    company.description = ""; company.email = ""; company.phone = this.request.telephone_company;
    this.iLicence.company = company;

    //admin
    let admin: User = new User();
    admin.lastname = this.request.nom_admin; admin.firstname = this.request.prenom_admin;
    admin.phone = this.request.telephone_admin;
    this.iLicence.admin = admin;

    this.request.fprint = this.fprint;

    this.profilService.askForLicenceNew(this.request)
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
            this.iLicence.act = result.act;

            this.saveLicence(this.iLicence); return;
          }else {
            this.isLoading = false;
            this.libraryService.showMessage(result.message); return;
          }
        },
        error => {
          this.isLoading = false;
          if (error.status === 401){
            this.libraryService.showMessage(error._body); return;
          }else {
            this.libraryService.showMessage("Une erreur est survenue lors de la connexion"); return;
          }
        }
      );
  }//fin askForLicence

  //savelicence
  saveLicence(obj: Licence): void {
    this.profilService.saveLicence(obj)
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
            this.libraryService.showMessage("Votre application a été activée"); return;
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

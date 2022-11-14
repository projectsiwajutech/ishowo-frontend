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


@Component({
  selector: 'it-licence-change-outside',
  templateUrl: './licence.change.outside.component.html',
  styleUrls: ['./licence.change.outside.component.css'] 

})

export class LicenceChangeOutsideComponent implements OnInit{

  isLoading: boolean = false; isLicenceOk: boolean = false;
  modulesList: Module;
  fprint: string;
  request: LicenceRequest = new LicenceRequest();
  iLicence: Licence = new Licence();
  isUserOk: boolean = false;
  codeCustomer: string = "";
  isCheckingProfile: boolean = false;

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
    this.user = new Profil(); 
    this.getModulesList(); this.getFPrint(); 
  }

  //check my Licence
  checkMyLicence(): void{
      this.isCheckingProfile = true;
      this.profilService.getUserByCode(this.codeCustomer)
      .then( (result: any) => {
        this.isCheckingProfile = false;
        if(result === null){
            this.libraryService.showMessage("Veuillez vérifier votre code et réessayer"); return;
        }
        this.user = result;
          this.isUserOk = true;
          this.getCurrentLicence();
        },
        (error: any) => {
          this.isCheckingProfile = false;
            this.libraryService.showMessage("Une erreur est survenue pendant la vérification de votre licence"); return;
        }
      );
  }//fin checkMyLicence

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
               this.libraryService.showMessage("Une erreur est survenue lors du test de votre configuration"); return;
        }
      );
  }//fin getFPrint

  //get current licence code
  getCurrentLicence(): void {
    this.profilService.getLastLicenceForUpdate()
      .then( (result: any) => {
          this.request.code = result.name;
        },
        (error: any) => {
            this.libraryService.showMessage("Une erreur est survenue lors de la vérification de votre licence"); return;
        }
      );
  }//fin getCurrentLicence

  //get modules list
  getModulesList(): void {
    this.profilService.getModulesFu()
      .then( (result: any) => {
          this.modulesList = result.data;
        },  (error: any) => {
           this.libraryService.showMessage("Une erreur est survenue lors du chargement des modules"); return;
         }
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
            this.iLicence.activationDate = result.date_activation;
            this.iLicence.activationCost = this.request.module.montant;
            this.iLicence.module = this.request.module.nom;
            this.iLicence.expiryDate = result.date_expiration;

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

  //is code customer right
  isCodeCustomerRight(): boolean{
    if(this.codeCustomer === undefined || this.codeCustomer === "") return false;    
    if(this.codeCustomer.length < 5) return false;
    return true;
  }//fin isCodeCustomerRight

}

/**
 * Created by Utilisateur on 26/03/2017.
 */


import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Profil} from "../../../models/profil/profil";
import {UserService} from "../../../services/user/user.service";
import {ProfileService} from "../../../services/profil/profil.service";
import {LibraryService} from "../../../services/app/library.service";
import {LocalStorageService} from "../../../services/app/localstorage.service";
import {AppService} from "../../../services/app/app.service";
import {Message} from 'primeng/primeng';
import {Company} from "../../../models/company/company";


@Component({
  selector: 'it-user-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.css']

})

export class UserProfileComponent implements OnInit{

  item :Profil  ;
  company: Company;
  currentCode : string = ""; newCode : string = "";
  isProfileChangeAreaVisible: boolean = false;
  loadingText: string = "Veuillez patienter...";
  isLoading: boolean = false; isCompanyLoading: boolean = false;

  uploadedFiles: any[] = [];
  logoUploadPath: string = "";
  msgs: Message[] = [];

  constructor(
    private profilService: ProfileService,
    private appService: AppService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.item = this.locStorService.getUser();
    if(this.item !== null){
        this.company = this.item.agency.company;
    }
    this.logoUploadPath = this.appService.getLogoUploadUrl();
  }

  //change profile
  changeProfileCode(): void {
    this.isProfileChangeAreaVisible = true;
  }//fin changeProfileCode

  //can udate profile
  canUpdateProfile(): boolean{
  let isPasswordCurrentEmpty: boolean = (this.currentCode === null || this.currentCode === undefined  || this.currentCode === "" );
  let isPasswordNewEmpty: boolean = (this.newCode === null || this.newCode === undefined  || this.newCode === "" );
  let isNotIdenticalCode: boolean = (this.currentCode !== this.newCode );

  if(isPasswordCurrentEmpty === true || isPasswordNewEmpty === true || isNotIdenticalCode === false){return false;} else { return true; }
  }//fin canUpdateProfile

  //login the user
  updateProfile(): void {
    this.isLoading = true;
    this.item.code = this.newCode;
    this.profilService.updateConnectedUserProfile(this.item)
      .then(
        result => {
          this.isLoading = false;
          if(result !== null){
            this.currentCode = ""; this.newCode = "";
            this.libraryService.showMessage("Votre mot de passe a été modifié");     this.isProfileChangeAreaVisible = false; return;
          }else{
            this.libraryService.showMessage("Erreur: Votre mot de passe n'a pas été modifié"); return;
          }
        },
        error => {
          this.isLoading = false;
          this.libraryService.showMessage("Impossible de mettre à jour votre mot de passe"); return;
        }
      );
  }//fin updateProfile


  goBack(): void {
    this.location.back();
  }

  //before upload
  public onBeforeUploadHandler(event: any)
  {
    // called before the file(s) are uploaded
    // Send the currently selected folder in the Header
    event.formData.append("user", this.item.login);
  }

  //on file upload
  onUpload($event: any){
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Mise à jour du logo', detail:'Le logo a été modifié'});
  }//fin onUpload

  //get logo
  getLogo(): string{

    if(this.item !== undefined && this.item.agency !== undefined && this.item.agency.company !== undefined){
      let fileUrl: string = this.appService.getResourceUrl() + "" + this.item.agency.company.logo;


      return fileUrl;
    }else{
      return "/assets/dist/img/user2-160x160.jpg";
    }
  }//end get logo

  //update company details
  updateCompanyDetails(): void{
    this.isCompanyLoading = true;
    this.profilService.updateCompanyProfile(this.company)
      .then(
        result => {
          this.isCompanyLoading = false;
          if(result === null) {
            this.libraryService.showMessage("Vos paramètres de connexion sont incorrects");
            return;
          }else{
            this.item.agency.company = result;
            this.company = this.item.agency.company;
            this.locStorService.saveUser(null);
            this.locStorService.saveUser(this.item);
            alert("Les données de l'entreprise ont été mises à jour");
          }
        },
        error => {
          this.isCompanyLoading = false;
          alert("Une erreur est survenue")
        }
      );
  }//fin updateCompanyDetails

  //change licence
  changeLicence(): void {
    let link = ['/licence_change'];
    this.router.navigate(link);
  }//fin changeLicence

}

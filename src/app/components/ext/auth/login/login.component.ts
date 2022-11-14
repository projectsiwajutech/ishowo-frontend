import { Licence } from './../../../models/licence/licence';
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


@Component({
  selector: 'it-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit{

  item :Profil  ;
  loadingText: string = "Veuillez patienter...";
  isLoading: boolean = false;
  freshTic: number;

  constructor(
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.refreshTic();
    this.freshTic = window.setInterval(() => this.refreshTic(), 3600000);  }

  ngOnInit(): void{
    this.item = new Profil();
  }

  //login the user
  signin(): void {
    this.isLoading = true;
    this.profilService.login(this.item)
      .then(
        result => {
          this.isLoading = false;
          if(result === null){
            this.libraryService.showMessage("Vos paramètres de connexion sont incorrects"); return;
          }else{
            this.locStorService.saveUser(result);
            //this.refreshTic();

            //redirect
            window.setTimeout(() =>   {
              let link = ['/app/home'];
              this.router.navigate(link);
            } , 1000);
          }
        },
        error => {
          this.isLoading = false;
          if(error.status === 400){
            this.libraryService.showMessage(error._body); return;
          }else{
            this.libraryService.showMessage("Une erreur est survenue lors de la connexion"); return;
          }
        }
      );
  }

  //refresh tic
  refreshTic(): void {
    this.profilService.refreshTic(this.item)
      .then( result => {  },  error => { }
      );
  }//fin refreshTic

  goBack(): void {
    this.location.back();
  }

  //show licence asking screen
  askForLicence(): void{
    let link = ['/licence_new'];
    this.router.navigate(link);
  }//fin askForLicence

  //update Licence
  updateLicence(): void{
    let link = ['/licence_change_outside'];
    this.router.navigate(link);
  }//fin updateLicence

}

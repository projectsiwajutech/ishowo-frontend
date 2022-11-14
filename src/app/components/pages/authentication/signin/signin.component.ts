import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';
/**
 * Created by Utilisateur on 26/03/2017.
 */

import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Profil } from "../../../../shared/models/profil/profil";
import { ProfileService } from "../../../../shared/services/profil/profil.service";
import { LibraryService } from "../../../../shared/services/app/library.service";
import { LocalStorageService } from "../../../../shared/services/app/localstorage.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  item: Profil;
  loadingText: string = "Veuillez patienter..."; codeCustomer: string;
  isUserOk: boolean = false;
  isLoading: boolean = false;
   isCheckingProfile: boolean;
  freshTic: number;
  showPass: boolean;

  constructor(
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.item = new Profil();
    this.onLoadFocus();
  }

  //login the user
  signin(): void {
    this.ngxService.start();
    this.isLoading = true;
    this.profilService.login(this.item)
      .then(
        (result : any) => {
          this.isLoading = false;
          if (result === null) {
            this.ngxService.stop();
            this.libraryService.onError('Vos paramètres de connexion sont incorrects', 2000, 'top-start'); return;
          } else {
            this.locStorService.saveUser(result.data);
            //redirect
            window.setTimeout(() => {
              let link = ['dashboard/main'];
              this.ngxService.stop();
              this.router.navigate(link);
            }, 100);
          }
        },
        error => {
          this.isLoading = false;
          this.ngxService.stop();
          if (error.status === 400) {
            this.libraryService.onError(error._body, 2000, 'top-start'); return;
          } else {
            this.libraryService.onError('Une erreur est survenue lors de la connexion', 2000, 'top-start'); return;
          }
        }
      );
  }

  //redirection vers nouvelle Licence
  NewLicenc() {
    console.log("ffffff")
    this.router.navigate(['auth/new']);
  }//fin redirection vers nouvelle Licence


  //redirection vers nouvelle Licence
  NewLicence() {
    console.log("ffffff")
        let link = ['auth/new-licence'];
    this.router.navigate(['auth/new-licence']);
  }//fin redirection vers nouvelle Licence

  //redirection vers mis à jour de Licence
  ChangeLicence() {
    let link = ['auth/change-licence'];
    this.router.navigate(link);
  }//fin redirection vers mis à jour de Licence


  //check my Licence
  checkMyLicence(): void {
    this.ngxService.start();
    this.isCheckingProfile = true;
    this.profilService.getUserByCode(this.codeCustomer)
      .then((result: any) => {
        this.isCheckingProfile = false;
        this.ngxService.stop();
        if (result === null) {
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Veuillez vérifier votre code et réessayer',
          }).then((result) => {
            if (result.isConfirmed) {
              this.CustomerCodeModal();
            } else {
              this.CustomerCodeModal();
            }
          });
        } else {
          this.locStorService.saveToSession('licence_user', result)
          this.isUserOk = true;
          this.ChangeLicence();
        }
      },
        (error: any) => {
          this.isCheckingProfile = false;
          this.ngxService.stop();
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Une erreur est survenue pendant la vérification de votre licence',
          })
        }
      );
  }//fin checkMyLicence

  async CustomerCodeModal() {
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary' },
      title: 'MISE A JOUR DE LICENCE',
      imageUrl: 'assets/images/params/update_licence.png',
      imageHeight: 100,
      imageWidth: 100,
      showCancelButton: true,
      input: 'text',
      inputLabel: 'Code Client',
      inputPlaceholder: 'Veuillez saisir le code Client',
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      cancelButtonText: `<i class="feather icon-x-circle"></i> Annuler`,
      confirmButtonText: `<i class="feather feather icon-refresh-cw"></i> Vérifier`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.codeCustomer = result.value;
        this.checkMyLicence();
      }
    });
  }

//Afficher Masquer le mot de passe
  showHidePass() {
    var input = document.getElementById("password");

    if ((input as HTMLInputElement).type === "password") {
      (input as HTMLInputElement).type = "text";
      this.showPass = true;
    }
    else {
      (input as HTMLInputElement).type = "password";
      this.showPass = false;
    }
  }

  //Premier Champ Actif
  onLoadFocus() {
   document.getElementById("login").focus();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Licence } from 'src/app/shared/models/licence/licence';
import { LicenceRequest } from 'src/app/shared/models/licence/licence.request';
import { Module } from 'src/app/shared/models/module/module';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { FormatMoneyPipe } from 'src/app/shared/pipes/format_money/format_money.pipe';

@Component({
  selector: 'app-change-licence',
  templateUrl: './change-licence.component.html',
  styleUrls: ['./change-licence.component.scss']
})
export class ChangeLicenceComponent implements OnInit {

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
    private ngxService: NgxUiLoaderService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.locStorService.readFromSession('licence_user');
    this.getModulesList(); this.getFPrint();
  }

  ngOnDestroy() {
    this.ngxService.stop;
  }

  //go to Signin
  goBack() {
    let link = ['/auth/connection'];
    this.router.navigate(link);
  }
  //go to Signin

  //get fprint
  getFPrint(): void {
    this.profilService.getFPrint()
      .then((result: any) => {
        this.fprint = result.name;
        this.request.fprint = this.fprint;
      },
        (error: any) => {
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Une erreur est survenue lors du test de votre configuration',
          })
        }
      );
  }//fin getFPrint

  //get current licence code
  getCurrentLicence(): void {
    this.profilService.getLastLicenceForUpdate()
      .then((result: any) => {
        this.request.code = result.name;
      },
        (error: any) => {
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Une erreur est survenue lors de la vérification de votre licence',
          })
        }
      );
  }//fin getCurrentLicence

  //get modules list
  getModulesList(): void {
    this.profilService.getModulesFu()
      .then((result: any) => {
        this.modulesList = result.data;
      }, (error: any) => {
        Swal.fire({
          customClass: { container: 'myCustomSwal' },
          icon: 'error',
          title: 'Une erreur est survenue lors du chargement des modules',
        })
      }
      );
  }//fin getModulesList

  //ask for licence
  askForLicence(module: any): void {
    this.ngxService.start();
    this.isLoading = true;
    this.request.id_company = this.user.agency.company.id;
    this.request.nom_company = this.user.agency.company.name;
    this.request.adresse_company = this.user.agency.company.address;
    this.request.telephone_company = this.user.agency.company.phone;
    this.request.secteur = this.user.agency.company.description;
    this.request.nom_admin = this.user.user.lastname;
    this.request.prenom_admin = this.user.user.firstname;
    this.request.telephone_admin = this.user.user.phone;
    this.request.module = module;
    this.request.code = this.user.agency.company.currentLicence.code;

    this.profilService.askForLicenceUpdate(this.request)
      .then(
        result => {
          if (result.status === "success") {
            //fill the rest of data
            this.iLicence.company = this.user.agency.company;
            this.iLicence.isActive = true;
            this.iLicence.code = result.code_client;
            this.iLicence.key = result.alea;
            this.iLicence.activationDate = result.date_activation.date;
            this.iLicence.expiryDate = result.date_expiration.date;
            this.iLicence.activationCost = this.request.module.montant;
            this.iLicence.module = this.request.module.nom;
            this.saveLicence(this.iLicence); return;
          } else {
            this.isLoading = false;
            this.ngxService.stop();
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: result.message,
            })
          }
        },
        error => {
          this.isLoading = false;
          this.ngxService.stop();
          if (error.status === 401) {
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: error._body,
            })
          } else {
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: 'Une erreur est survenue lors de la connexion',
            })
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
          this.ngxService.stop();
          if (result === null) {
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: 'Une erreur est survenue',
            })
          } else {
            this.ngxService.stop();
            this.isLicenceOk = true;
            this.iLicence = result;
            this.request = new LicenceRequest();
            localStorage.removeItem('licence_user');
            this.SuccessOperationModal(this.iLicence);
            this.goBack();
          }
        },
        error => {
          this.isLoading = false;
          if (error.status === 401) {
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: error._body,
            })
            this.goBack();
          } else {
            Swal.fire({
              customClass: { container: 'myCustomSwal' },
              icon: 'error',
              title: 'Une erreur est survenue.',
            })
          }
        }
      );
  }//fin saveLicence

  //login now
  loginNow(): void {
    let link = ['/login'];
    this.router.navigate(link);
  }//fin loginNow

  //get licence status
  getLicenceStatus(status: boolean): string {
    if (status === true) return "ACTIVEE";
    else return "INACTIVE";
  }//fin getLicenceStatus

  //is code customer right
  isCodeCustomerRight(): boolean {
    if (this.codeCustomer === undefined || this.codeCustomer === "") return false;
    if (this.codeCustomer.length < 5) return false;
    return true;
  }//fin isCodeCustomerRight

  //modal de mise à jour réussie
  async SuccessOperationModal(licence: any) {
    let startDate = new DatePipe('en-US').transform(licence.activationDate, 'dd/MM/yyyy');
    let endDate = new DatePipe('en-US').transform(licence.expiryDate, 'dd/MM/yyyy');
    Swal.fire({
      title: 'Mis à jour réussie!',
      icon: 'success',
      html:
        '<br><div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Code Client : </p> <p class="badge col-sm-3 badge-success">' + licence.code + '</p></div>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Votre licence est : </p><p class="badge col-sm-3 badge-success">' + this.getLicenceStatus(licence.isActive) + '</p></div>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Commence le : </p><p class="badge col-sm-3 badge-success">' + startDate + '</p></div>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Expire le : </p><p class="badge col-sm-3 badge-success">' + endDate + '</p></div>'
    })
  }//fin message de succès

  //modal d'avertissement du processus de payement
  async LaunchPayModal(module: any) {
    let formatAmount = new FormatMoneyPipe().transform(module.montant, '');
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary', cancelButton: 'btn btn-light', denyButton: 'btn btn-warning' },
      icon: 'info',
      title: 'DEMARRAGE DU PROCESSUS DE PAIEMENT',
      html: '<br><p class="text-center h4"> Un processus de paiement d\'un montant de <span class="badge badge-success mt-1">' + formatAmount +
        ' FCFA </span> sera lancé sur le numéro de téléphone suivant : <span class="badge badge-success mt-1">' + this.user.user.phone + '</span> </p>' +
        '<p class="text-center font-weight-bold h3 text-warning">Voulez-vous modifier ce numéro ?</p>',
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: `<i class="feather icon-check-circle"></i> Continuer`,
      denyButtonText: `<i class="feather icon-edit-1"></i> Oui, Modifier`,
      denyButtonColor: '#ff9800',
      cancelButtonText: `<i class="feather icon-x-circle"></i> Annuler`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.askForLicence(module);
      } else if (result.isDenied) {
        this.changePayNumber(module);
      }
    });
  }
  //fin modal d'avertissement du processus de payement


  //change Transaction phone number
  async changePayNumber(module: any) {
    let format = this.user.user.phone.substring(5);
    let formatScreen = format.replaceAll('-','');
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary' },
      title: 'MODIFICATION DU NUMERO DE PAIEMENT',
      imageUrl: 'assets/images/params/payPhoneNumb.png',
      imageHeight: 122,
      imageWidth: 200,
      showCancelButton: true,
      input: 'text',
      inputValue: formatScreen,
      inputLabel: 'Numéro de paiement',
      inputPlaceholder: 'Veuillez saisir le numéro de paiement',
      inputValidator: (value) => {
        let result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(value);
        if (!value || !result) {
          return 'Numéro de téléphone Invalide!'
        }
      },
      inputAttributes: {
        maxlength: 8,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      cancelButtonText: `<i class="feather icon-x-circle"></i> Annuler`,
      confirmButtonText: `<i class="feather icon-check-circle"></i> Confirmer`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let format = result.value.match(/\d{2}/g).join('-');
        this.user.user.phone = '+229' + ' ' + format;
        this.LaunchPayModal(module);
      } else {
        this.LaunchPayModal(module);
      }
    });
  }
  //fin change Transaction phone number
}

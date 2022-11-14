import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/shared/models/company/company';
import { Licence } from 'src/app/shared/models/licence/licence';
import { LicenceRequest } from 'src/app/shared/models/licence/licence.request';
import { Module } from 'src/app/shared/models/module/module';
import { User } from 'src/app/shared/models/user/user';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { FormatMoneyPipe } from 'src/app/shared/pipes/format_money/format_money.pipe';
import { Formule } from 'src/app/shared/models/formule/formule';

export class FormInput {
  requiredInput: any;
  phone: any;
  Ent_name: any;
  address: any;
  secteur: any;
  Admin_lastname: any;
  Admin_firstname: any;
  Admin_phone: any;
  Admin_email: any;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  formInput: FormInput;
  form: any;
  Indicatif = "+229";
  Indicatif1 = "+229";
  Indicatif2 = "+228";
  phoneValid: boolean = true;
  phoneAdminValid: boolean = true;

  isLoading: boolean = false; isLicenceOk: boolean = false;
  modulesList: Module[];
  formulesList: Formule[];
  formulesListOfModule: Formule[];
  fprint: string;
  request: LicenceRequest = new LicenceRequest();
  iLicence: Licence = new Licence();

  public isSubmit: boolean;
  constructor(
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private ngxService: NgxUiLoaderService,
    private datePipe: DatePipe,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isSubmit = false;
  }

  public maskMobileNo = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  ngOnInit(): void {
    this.getModulesList();
    this.getFPrint();
    this.getFormulesList();
    this.formInput = {
      requiredInput: '',
      phone: '',
      Ent_name: '',
      address: '',
      secteur: '',
      Admin_lastname: '',
      Admin_firstname: '',
      Admin_phone: '',
      Admin_email: '',
    };
  }

  //go to Signin
  goBack() {
    let link = ['/auth/connection'];
    this.router.navigate(link);
  }
  //go to Signin

  checkPhoneNumber(phone: any) {
    this.phoneValid = false;
    let count = 0;
    let pos = phone.indexOf("_");

    while (pos != -1) {
      count++;
      pos = phone.indexOf("_", pos + 1);
    }
    if (count > 0 || phone === "") {
      this.phoneValid = false;
    } else {
      let filterOne = phone.replaceAll('-', '');
      let filterTwo = filterOne.replaceAll(' ', '');
      let ckeckResponse = this.libraryService.checkPhoneNumber(filterTwo);

      switch (ckeckResponse) {
        case true:
          return this.phoneValid = true;
          break;

        case false:
          return this.phoneValid = false;
          break;

        default:
          return this.phoneValid = false;
          break;
      }

    }
  }

  checkAdminPhoneNumber(phone: any) {
    this.phoneAdminValid = false;
    let count = 0;
    let pos = phone.indexOf("_");

    while (pos != -1) {
      count++;
      pos = phone.indexOf("_", pos + 1);
    }
    if (count > 0 || phone === "") {
      this.phoneAdminValid = false;
    } else {
      let filterOne = phone.replaceAll('-', '');
      let filterTwo = filterOne.replaceAll(' ', '');
      let ckeckResponse = this.libraryService.checkPhoneNumber(filterTwo);

      switch (ckeckResponse) {
        case true:
          return this.phoneAdminValid = true;
          break;

        case false:
          return this.phoneAdminValid = false;
          break;

        default:
          return this.phoneAdminValid = false;
          break;
      }

    }
  }


  //step One saveCompanyData
  saveCompanyData(form: any) {
    if (form.Ent_name === "") {
      this.libraryService.onWarning('veuillez renseignez le nom de l\'Entreprise', 1300, 'top-end'); return;
    } else if (form.address === "") {
      this.libraryService.onWarning('veuillez renseignez l\'adresse de l\'Entreprise', 1300, 'top-end'); return;
    } else if (form.secteur === "") {
      this.libraryService.onWarning('veuillez renseignez le secteur de l\'Entreprise!', 1300, 'top-end'); return;
    } else if ((this.phoneValid == false) || form.phone === "") {
      this.libraryService.onWarning('Numéro de téléphone Invalide!', 1300, 'top-end'); return;
    }

    this.request.nom_company = form.Ent_name;
    this.request.adresse_company = form.address;
    this.request.secteur = form.secteur;
    this.request.telephone_company = form.indicatif + ' ' + form.phone;

    var button = document.getElementById("gotoStepTwo");
    button?.click();
  }//fin step One saveCompanyData

  //step Two saveAdministratorData
  saveAdministratorData(form: any) {
    if (form.Admin_lastname === "") {
      this.libraryService.onWarning('veuillez renseignez le nom de l\'Entreprise', 1300, 'top-end'); return;
    } else if (form.Admin_firstname === "") {
      this.libraryService.onWarning('veuillez renseignez l\'adresse de l\'Entreprise', 1300, 'top-end'); return;
    } else if (form.Admin_email === "") {
      this.libraryService.onWarning('veuillez renseignez l\'email de l\'Entreprise', 1300, 'top-end'); return;
    } else if ((this.phoneAdminValid == false) || form.AdminPhone === "") {
      this.libraryService.onWarning('Numéro de téléphone Invalide!', 1300, 'top-end'); return;
    }

    this.request.nom_admin = form.Admin_lastname;
    this.request.prenom_admin = form.Admin_firstname;
    this.request.email_admin = form.Admin_email;
    this.request.telephone_admin = form.indicatif + ' ' + form.AdminPhone;;

    var button = document.getElementById("gotoStepThree");
    button?.click();
  }//fin step Two saveAdministratorData

  // //step Three askForLicence
  // askForLicence(module: any, montant: any, duree: any) {
  //   this.ngxService.start();
  //   this.request.module = module;
  //   this.request.module.montant = montant;
  //   this.request.module.duree = duree;
  //   //company
  //   let company: Company = new Company();
  //   company.name = this.request.nom_company; company.address = this.request.adresse_company;
  //   company.description = ""; company.email = ""; company.phone = this.request.telephone_company;
  //   this.iLicence.company = company;

  //   //admin
  //   let admin: User = new User();
  //   admin.lastname = this.request.nom_admin; admin.firstname = this.request.prenom_admin;
  //   admin.phone = this.request.telephone_admin;
  //   this.iLicence.admin = admin;

  //   this.profilService.askForLicenceNew(this.request)
  //     .then(
  //       result => {
  //         if (result.status === "success") {
  //           //fill the rest of data
            // this.iLicence.code = result.code_client;
            // this.iLicence.key = result.alea;
            // this.iLicence.isActive = true;
            // this.iLicence.activationDate = result.date_activation.date;
            // this.iLicence.activationCost = this.request.module.montant;
            // this.iLicence.module = this.request.module.nom;
            // this.iLicence.expiryDate = result.date_expiration.date;
            // this.iLicence.act = result.act;
            // this.ngxService.stop();
  //           this.saveLicence(this.iLicence); return;
  //         } else {
  //           this.isLoading = false;
  //           this.ngxService.stop();
  //           this.libraryService.onWarning(result.message, 5000, 'top-end'); return;
  //         }
  //       },
  //       error => {
  //         this.isLoading = false;
  //         if (error.status === 401) {
  //           this.ngxService.stop();
  //           this.libraryService.onWarning(error._body, 5000, 'top-end'); return;
  //         } else {
  //           this.ngxService.stop();
  //           this.libraryService.onWarning('Une erreur est survenue au cours de l\'enregistrement', 5000, 'top-end'); return;
  //         }
  //       }
  //     );

  // }//fin step Three askForLicence

  //get modules list
  getModulesList(): void {
    this.profilService.getModules()
      .then((result: any) => {
        this.modulesList = result.data;
      }, (error: any) => { }
      );
  }//fin getModulesList

  //get formules list
  getFormulesList(): void {
    this.profilService.getFormules()
      .then((result: any) => {
        this.formulesList = result.data;
      }, (error: any) => { }
      );
  }//fin getFormulesList

  //get modules list
  getFormulesListById(id: number, type: any) {
    let formule: Formule = this.formulesList.filter(x => (x.module_id == id) && (x.type === type))[0];
    return formule.montant + " Fcfa (" + formule.duree + " Jours)";
  }//fin getModulesList

  //savelicence
  askForLicence(){
    this.ngxService.start();
    // this.request.module = module;
    // this.request.module.montant = montant;
    // this.request.module.duree = duree;
    
    //company
    let company: Company = new Company();
    company.name = this.request.nom_company; company.address = this.request.adresse_company;
    company.description = ""; company.email = ""; company.phone = this.request.telephone_company;
    this.iLicence.company = company;
  
    //   //admin
     let admin: User = new User();
    admin.lastname = this.request.nom_admin; admin.firstname = this.request.prenom_admin;
    admin.email = this.request.email_admin;
    admin.phone = this.request.telephone_admin;
    this.iLicence.admin = admin;

    //other data
    this.iLicence.code = ' ';
    // this.iLicence.key = result.alea;
     this.iLicence.isActive = true;
    // this.iLicence.activationDate = result.date_activation.date;
    //  this.iLicence.activationCost = this.request.module.montant;
    //  this.iLicence.module = this.request.module.nom;
    // this.iLicence.expiryDate = result.date_expiration.date;
    // this.iLicence.act = this.request.act;

    

    this.profilService.saveLicence(this.iLicence)
      .then(
        (result: any) => {
          this.iLicence.key = "";
          this.isLoading = false;
          if (result === null) {
            this.libraryService.onWarning('Une erreur est survenue', 5000, 'top-end'); return;
          } else {
            this.isLicenceOk = true;
            this.iLicence = result.data;
            this.request = new LicenceRequest();
            this.SuccessOperationModal(this.iLicence);
            this.goBack();
            this.ngxService.stop();
          }
        },
        error => {
          this.isLoading = false;
          if (error.status === 401) {
            this.ngxService.stop();
            this.libraryService.onWarning(error._body, 5000, 'top-end'); return;
          } else {
            this.ngxService.stop();
            this.libraryService.onWarning('Une erreur est survenue', 5000, 'top-end'); return;
          }
        }
      );
  }//fin saveLicence

  //login now
  loginNow(): void {
    let link = ['/login'];
    this.router.navigate(link);
  }//fin loginNow

  
  //create acocunt
  createAccount(): void {
   
  }// end create acocunt

  //get fprint
  getFPrint(): void {
        this.profilService.getFPrint()
      .then(result => {
        this.request.fprint = result;
      },
        (error: any) => {
        }
      );
  }//fin getFPrint

  //get licence status
    getLicenceStatus(status: boolean): string {
    if (status === true) return "ACTIVEE";
    else return "INACTIVE";
  }//fin getLicenceStatus


  //Echec de l'enregistrement
  errorSwal() {
    Swal.fire('Echec de l\'Enregistrement', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  //modal d'avertissement du processus de payement
  async LaunchPayModal(module: any, type: any) {
    let formule: Formule = this.formulesList.filter(x => (x.module_id == module.id) && (x.type === type))[0];
    if (module.id == 1) {
      //this.askForLicence(module, 0, 0);
      this.askForLicence();
    } else {
      let formatAmount = new FormatMoneyPipe().transform(formule.montant, '');
      await Swal.fire({
        customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary', cancelButton: 'btn btn-light', denyButton: 'btn btn-warning' },
        icon: 'info',
        title: 'DEMARRAGE DU PROCESSUS DE PAIEMENT',
        html: '<br><p class="text-center h4"> Un processus de paiement d\'un montant de <span class="badge badge-info mt-1">' + formatAmount +
          ' FCFA </span> sera lancé sur le numéro de téléphone suivant : <span class="badge badge-info mt-1">' + this.request.telephone_admin + '</span> </p>' +
          '<p class="text-center font-weight-bold h3 text-warning"> Voulez-vous modifier ce numéro ?</p>',
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
          //this.askForLicence(module, formule.montant, formule.duree);
          this.askForLicence();
        } else if (result.isDenied) {
          this.changePayNumber(module, type);
        }
      });
    }
  }
  //fin modal d'avertissement du processus de payement


  //change Transaction phone number
  async changePayNumber(module: any, type:any) {
    let format = this.request.telephone_admin.substring(5);
    let formatScreen = format.replaceAll('-', '');
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-primary' },
      title: 'MODIFICATION DU NUMERO DE PAIEMENT',
      imageUrl: 'assets/images/params/payPhoneNumb.png',
      imageHeight: 122,
      imageWidth: 200,
      showCancelButton: true,
      input: 'text',
      inputLabel: 'Numéro de paiement',
      inputValue: formatScreen,
      inputPlaceholder: '90102030',
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
        this.request.telephone_admin = '+229' + ' ' + format;
        this.LaunchPayModal(module, type);
      } else {
        this.LaunchPayModal(module, type);
      }
    });
  }
  //fin change Transaction phone number

  async SuccessOperationModal(licence: any) {
    let startDate = new DatePipe('en-US').transform(licence.activationDate, 'dd/MM/yyyy');
    let endDate = new DatePipe('en-US').transform(licence.expiryDate, 'dd/MM/yyyy');
    Swal.fire({
      title: 'Votre Licence a été activée!',
      icon: 'success',
      html:
        '<br>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Votre licence est : </p><p class="badge col-sm-3 badge-success">' + this.getLicenceStatus(licence.isActive) + '</p></div>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Commence le : </p><p class="badge col-sm-3 badge-success">' + startDate + '</p></div>' +
        '<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Expire le : </p><p class="badge col-sm-3 badge-success">' + endDate + '</p></div>'
    })

    //<div class="row"><p class="mb-2 col-sm-9 f-16 text-left"><i class="feather icon-check-circle mr-2 text-primary"></i> Code Client : </p> <p class="badge col-sm-3 badge-success">' + licence.code + '</p></div>
  }

}

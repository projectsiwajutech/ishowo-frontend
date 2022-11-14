import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LibraryService } from './../../../../../shared/services/app/library.service';
import { LocalStorageService } from './../../../../../shared/services/app/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/shared/models/profil/profil';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { Router } from '@angular/router';
import { ParamMecef } from 'src/app/shared/models/paramMecef/paramMecef';
import { UpdateMecef } from 'src/app/shared/models/updateMecef/updateMecef';

@Component({
  selector: 'app-param-mecef',
  templateUrl: './param-mecef.component.html',
  styleUrls: ['./param-mecef.component.scss']
})
export class ParamMecefComponent implements OnInit {
  portMecef: number;
  setMecef: boolean;
  setEMecef: boolean;
  setGroup: string;
  setAIB: string;
  Changed: boolean;
  user: Profil;

  constructor(
    private mecefService: SaleService,
    private locStorService: LocalStorageService,
    private router: Router,
    private libraryService: LibraryService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getParamsMecef();
  }

  //Incrementation du port COM
  IncrementNumber() {
    this.portMecef++;
    this.CheckNumber();
    return;
  }

  //Décrémentation du port COM
  DecrementNumber() {
    this.portMecef = this.portMecef - 1;
    this.CheckNumber();
    return;
  }//fin Décrémentations


  //CHANGE GROUP LEFT
  ChangeTaxGroupLeft() {
    this.Changed = true;
    switch (this.setGroup) {
      case "A":
        this.setGroup = "B";
        break;

      case "E":
        this.setGroup = "A";
        break;

      case "B":
        this.setGroup = "E";
        break;

      default:
        break;
    }
  }

  //Change group right
  ChangeTaxGroupRight() {
    this.Changed = true;
    switch (this.setGroup) {
      case "A":
        this.setGroup = "E";
        break;

      case "E":
        this.setGroup = "B";
        break;

      case "B":
        this.setGroup = "A";
        break;

      default:
        break;
    }
  }
  //End change group right

  //ShowGroupText
  ShowGroupText() {
    switch (this.setGroup) {
      case "A":
        return "Produits Exonérés de la TVA (TVA: 0%)"
        break;

      case "E":
        return "Produits sous Régime TPS (TVA: 0%)"
        break;

      case "B":
        return "Produits Taxables (TVA: 18%)"
        break;

      default:
        break;
    }
  }
  //end ShowGroupText

  //Change AIB left
  ChangeAIBLeft() {
    this.Changed = true;

    switch (this.setAIB) {
      case "0%":
        this.setAIB = "5%";
        break;

      case "1%":
        this.setAIB = "0%";
        break;

      case "5%":
        this.setAIB = "1%";
        break;

      default:
        break;
    }
  }
  //End Change AIB Left

  //Change AIB right
  ChangeAIBRight() {
    this.Changed = true;
    switch (this.setAIB) {
      case "0%":
        this.setAIB = "1%";
        break;

      case "1%":
        this.setAIB = "5%";
        break;

      case "5%":
        this.setAIB = "0%";
        break;

      default:
        break;
    }
  }
  //End change AIB right

  //ShowGroupText
  ShowAIBText() {
    switch (this.setAIB) {
      case "0%":
        return "Aucun Taux AIB ne sera appliqué"
        break;

      case "1%":
        return "Taux AIB: 1%"
        break;

      case "5%":
        return "Taux AIB: 5%"
        break;

      default:
        break;
    }
  }
  //end ShowGroupText

  //Check de la quantité
  CheckNumber() {
    //check qty
    this.Changed = true;
    if (this.portMecef == 0 || this.portMecef == null) {
      this.portMecef = 1;
      this.libraryService.onWarning('Numéro de Port invalide !', 1000, 'top-end');
      return;
    }
  }//fin Check de la quantité

  //get paramsMecef
  getParamsMecef(): void {
    this.mecefService.getParamsMecef(this.user)
      .then(
        paramsMecef => {
          let port = paramsMecef.filter(param => param.key === "PORT")[0];
          let setMecef = paramsMecef.filter(param => param.key === "MECEF")[0];
          let setGroup = paramsMecef.filter(param => param.key === "DEF_TAX")[0];
          let setAIB = paramsMecef.filter(param => param.key === "AIB")[0];
          let setEMecef = paramsMecef.filter(param => param.key === "EMECEF")[0];
          this.portMecef = JSON.parse(port.value);
          this.setMecef = JSON.parse(setMecef.value);
          this.setGroup = setGroup.value;
          this.setAIB = setAIB.value;
          this.setEMecef = JSON.parse(setEMecef.value);
        },
        error => {
        }
      );
  }//fin paramsMecef

  //OnchangeMecef Status
  OnchangeStatut() {
    this.Changed = true;
    if (this.setMecef == false) {
      this.setMecef = true;
      this.setEMecef = false;
      this.libraryService.onSuccess('Normalisation Mecef Activée!', 1000, 'top-end');
    }
    else if (this.setMecef == true) {
      this.setMecef = false;
      this.libraryService.onSuccess('Normalisation Mecef Désactivée!', 1000, 'top-end');
    }
  }// fin OnchangeMecef Status

  //OnchangeEMecef Status
  OnchangeStatutEmecef() {
    this.Changed = true;
    if (this.setEMecef == false) {
      this.setEMecef = true;
      this.setMecef = false;
      this.libraryService.onSuccess('Normalisation e-MeCEF Activée!', 1000, 'top-end');
    }
    else if (this.setEMecef == true) {
      this.setEMecef = false;
      this.libraryService.onSuccess('Normalisation e-MeCEF Désactivée!', 1000, 'top-end');
    }
  }// fin OnchangeEMecef Status

  save() {
    this.ngxService.start();
    let ChangeParam = new UpdateMecef();
    ChangeParam.key_port = JSON.stringify(this.portMecef);
    ChangeParam.key_mecef = JSON.stringify(this.setMecef);
    ChangeParam.key_g_tax = this.setGroup;
    ChangeParam.key_emecef = JSON.stringify(this.setEMecef);
    ChangeParam.key_aib = this.setAIB;
    this.mecefService.updateMecefParams(ChangeParam)
      .then(
        result => {
          this.ngxService.stop();
          this.successSwal();
        },
        error => {
          this.ngxService.stop();
          this.errorSwal();
        }
      );
  }

  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Enregistrement réussi!',
      showConfirmButton: false,
      icon: "success",
      timer: 1100,
      timerProgressBar: true,
    })
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  //Echec de l'enregistrement
  errorSwal() {
    Swal.fire('Echec de l\'Enregistrement', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }
}

import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  selector: 'it-licence-current',
  templateUrl: './licence.current.component.html',
  styleUrls: ['./licence.current.component.css']

})

export class LicenceCurrentComponent implements OnInit{

  isLoading: boolean = false; isLicenceOk: boolean = false;
  iLicence: Licence = new Licence();
  @Input() visible: boolean = true;
  @Output() communicated = new EventEmitter<boolean>();

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
    this.getCurrentLicence(); 
  }

  //get licence status
  getLicenceStatus(status: boolean): string{
      if(status === true) return "ACTIVEE";
    else return "INACTIVE";
  }//fin getLicenceStatus

  //get getCurrentLicence
  getCurrentLicence(): void {
    this.isLoading = true;
    this.profilService.getCurrentLicence()
      .then( (result: any) => {
        this.isLoading = false;
        if(result !== null){
          this.iLicence = result;
          this.communicated.emit(this.canDisplayAlert());
        }else{
          alert("Une erreur est survenue");
        }
        },
        (error: any) => {
        this.isLoading = false;
        }
      );
  }//fin getCurrentLicence

  //get description
  getDescription(){
    if(this.iLicence.module === null || this.iLicence.module === undefined) return "";
    return this.iLicence.module;
  }//fin getDescription


  //get remaining days
  getRemainingDays(): number{
    if(this.iLicence === undefined) return 0;
    let diffDays: number = 0; let timeDiff: number = 0;

    let dateExp: any = new Date(this.iLicence.expiryDate);
    let dateAct: any = new Date();
    timeDiff = Math.abs(dateExp.getTime() - dateAct.getTime());
    diffDays  = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }//fin getRemainingDays

   //can display alert
  canDisplayAlert(): boolean{
    if(this.iLicence === undefined) return false;
    let totalDays: number = 0; let timeDiff: number = 0;

    let dateExp: any = new Date(this.iLicence.expiryDate);
    let dateAct: any = new Date(this.iLicence.activationDate);
    timeDiff = Math.abs(dateExp.getTime() - dateAct.getTime());
    totalDays  = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let remainingDays : number = this.getRemainingDays();
    if ((totalDays / 2) > remainingDays) return true;
    else return false;
  }//fin canDisplayAlert

}

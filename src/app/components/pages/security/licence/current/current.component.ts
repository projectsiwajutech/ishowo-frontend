import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Licence } from 'src/app/shared/models/licence/licence';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit{

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

import { Group } from './../../../../models/group/group';
import { ProfileService } from './../../../../services/profil/profil.service';
import { User } from './../../../../models/user/user';

import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Bank} from "../../../../models/bank/bank";
import {BankService} from "../../../../services/bank/bank.service";
import {LibraryService} from "../../../../services/app/library.service";
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";
import {AccountType} from "../../../../models/accounttype/accounttype";
import {VirtualAccount} from "../../../../models/virtualaccount/virtualaccount";

@Component({
  selector: 'it-vaccount-update',
  templateUrl: './vaccount.update.component.html',
  //styleUrls: ['./bank.component.css']

})

export class VirtualAccountUpdateComponent implements OnInit, OnChanges{

  visible: boolean = false;
  @Input() item: VirtualAccount ;
  @Input() subject: string;
  banks: Bank[] = [];
  profiles: Profil[] = [];
  account_types: AccountType[] = [];

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";  isProfileVisible: boolean = false; isBankVisible: boolean = false;

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private bankService: BankService,
    private profilService: ProfileService,
    private vAccountService: VirtualAccountService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.toogleItemsVisibility();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.account_types.length !==0){this.selectAccountType();} else { this.getAccountTypes(); }
    if(this.banks.length !==0){this.selectBank();} else { this.getBanks(); }
    if(this.profiles.length !== 0){this.selectProfile();} else { this.getProfiles(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.vAccountService.updateVirtualAccount(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.updated.emit("updated");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select an account type
  selectAccountType(): void{
    if(this.account_types === null || this.account_types === undefined) return;
    if(this.account_types.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new VirtualAccount();

      this.item.account_type = this.account_types.filter( account_type => account_type.id === this.item.account_type.id)[0];
    }
  }//fin selectAccountType

  //get list of account types
  getAccountTypes(): void {
    this.account_types = [];
    this.vAccountService.getAccountTypes(this.user)
      .then(
        account_types => {
          this.account_types = account_types;
          this.selectAccountType();
        },
        error => {
        }
      );
  }//fin getAccountTypes

  //select a bank
  selectBank(): void{
    if(this.banks === null || this.banks === undefined) return;
    if(this.banks.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new VirtualAccount();
      if(this.item.bank !== null){
        this.item.bank = this.banks.filter( bank => bank.id === this.item.bank.id)[0];
      }
    }
  }//fin selectBank

  //get list of banks
  getBanks(): void {
    this.banks = [];
    this.bankService.getBanks(this.user)
      .then(
        banks => {
          this.banks = banks;
          this.selectBank();
        },
        error => {
        }
      );
  }//fin getBanks

  //select a profile
  selectProfile(): void{
    if(this.profiles === null || this.profiles === undefined) return;
    if(this.profiles.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new VirtualAccount();
      if(this.item.beneficiaire !== null){
          this.item.beneficiaire = this.profiles.filter( profile => profile.id === this.item.beneficiaire.id)[0];
      }
    }
  }//fin selectProfile

    //get list of profiles
  getProfiles(): void {
    this.profiles = [];
    this.profilService.getProfiles(this.user)
      .then(
        profiles => {
          let emptyProfile: Profil = new Profil();
          emptyProfile.user = new User();
          emptyProfile.user.firstname = "ENTREPRISE"; emptyProfile.user.lastname = "";
          emptyProfile.group = new Group();
          emptyProfile.group.name = "ENTREPRISE";
          emptyProfile.login = "AUCUN"; 
          profiles.push(emptyProfile);
          this.profiles = profiles;
        },
        error => {
        }
      );
  }//fin getProfiles

//toogle profile visibility
toogleItemsVisibility(): void{
    if(this.item === undefined) return;
    let accountType: string = this.item.account_type.name.toLowerCase();

    switch(accountType){
      case "caisse" : this.isBankVisible = false;   this.isProfileVisible = true; this.item.bank = null; break;
      case "bancaire" : this.isBankVisible = true;   this.isProfileVisible = false; this.item.beneficiaire = null; break;
      default : this.isBankVisible = false;   this.isProfileVisible = false; this.item.bank = null; this.item.beneficiaire = null; break;
    }
}//fin toogleItemsVisibility

}

import { Group } from './../../../../models/group/group';
import { User } from './../../../../models/user/user';
import { ProfileService } from './../../../../services/profil/profil.service';
import { Profil } from './../../../../models/profil/profil';


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Bank} from "../../../../models/bank/bank";
import {BankService} from "../../../../services/bank/bank.service";
import {LibraryService} from "../../../../services/app/library.service";
import {VirtualAccount} from "../../../../models/virtualaccount/virtualaccount";
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";
import {AccountType} from "../../../../models/accounttype/accounttype";

@Component({
  selector: 'it-vaccount-create',
  templateUrl: './vaccount.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class VirtualAccountCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: VirtualAccount;
  banks: Bank[];
  profiles: Profil[];
  account_types: AccountType[];

  visible: boolean = false; isProfileVisible: boolean = false; isBankVisible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private vAccountService: VirtualAccountService,
    private bankService: BankService,
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item = new VirtualAccount();
    this.getAccountTypes();
    this.getBanks();
    this.getProfiles();
  }

  ngOnChanges(): void{
    this.item = new VirtualAccount();
  }//end ngOnChanges

  //create object
  save(form : any){
    this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.vAccountService.createVirtualAccount(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true;
          
          if(result === null){
              this.isSuccess = false;
              this.statusMessage = this.libraryService.getServiceErrorText("Une erreur est survenue"); return;
          }
          // /this.item = result;
          this.visible = false; this.isSuccess = true;
          this.item = new VirtualAccount();
          this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }//fin save

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new VirtualAccount();
  }

  //get list of account types
  getAccountTypes(): void {
    this.account_types = [];
    this.vAccountService.getAccountTypes(this.user)
      .then(
        account_types => {
          this.account_types = account_types;
        },
        error => {
        }
      );
  }//fin getAccountTypes

  //get list of banks
  getBanks(): void {
    this.banks = [];
    this.bankService.getBanks(this.user)
      .then(
        banks => {
          this.banks = banks;
        },
        error => {
        }
      );
  }//fin getBanks

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

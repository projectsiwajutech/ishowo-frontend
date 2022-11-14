import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountType } from 'src/app/shared/models/accounttype/accounttype';
import { Bank } from 'src/app/shared/models/bank/bank';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { User } from 'src/app/shared/models/user/user';
import { VirtualAccount } from 'src/app/shared/models/virtualaccount/virtualaccount';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { BankService } from 'src/app/shared/services/bank/bank.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { VirtualAccountService } from 'src/app/shared/services/virtualaccount/virtualaccount.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vaccount-create',
  templateUrl: './vaccount-create.component.html',
  styleUrls: ['./vaccount-create.component.scss']
})
export class VaccountCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: VirtualAccount;
  banks: Bank[];
  profiles: Profil[];
  account_types: AccountType[];

  show: boolean = false;
  visible: boolean = false; isProfileVisible: boolean = false; isBankVisible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router : Router,
    public activeModal: NgbActiveModal,
    private vAccountService: VirtualAccountService,
    private bankService: BankService,
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void{
    this.onLoadFocus();
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
    this.show = true;
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
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
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

//Enregistrement réussie
successSwal() {
  Swal.fire({
    customClass: { container: 'myCustomSwal'},
    title: 'Enregistrement réussi!',
    showConfirmButton: false,
    icon : "success",
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

  //Fermeture
  close() {
    this.created.emit("created");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("intitule_name").focus();
   }
}

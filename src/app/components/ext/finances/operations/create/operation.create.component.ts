import { VirtualAccount } from './../../../../models/virtualaccount/virtualaccount';
import { FinOperation } from './../../../../models/finoperation/finoperation';
import { Group } from './../../../../models/group/group';
import { User } from './../../../../models/user/user';
import { ProfileService } from './../../../../services/profil/profil.service';


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {BankService} from "../../../../services/bank/bank.service";
import {LibraryService} from "../../../../services/app/library.service";
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";

@Component({
  selector: 'it-fin-operation-create',
  templateUrl: './operation.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class FinancialOperationCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: FinOperation;
  operation_types: string[] = [];
  accounts: VirtualAccount[];

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
    this.item = new FinOperation();
    this.operation_types = this.vAccountService.getOperationTypes();
    this.getAccounts();
  }

  ngOnChanges(): void{
    this.item = new FinOperation();
  }//end ngOnChanges

  //create object
  save(form : any): void{
    this.item.agent = this.user;
	  this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.vAccountService.createFinOperation(this.item)
      .then(
        result => {
                this.isSaving = false; this.isCompleted = true;
          
          if(result === null){
              this.isSuccess = false;
              this.statusMessage = this.libraryService.getServiceErrorText("Une erreur est survenue"); return;
          }
          // /this.item = result;
          this.visible = false; this.isSuccess = true;
          this.item = new FinOperation();
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
    this.item = new FinOperation();
  }

  //get list of accounts
  getAccounts(): void {
    this.accounts = [];
    this.vAccountService.getVirtualAccounts(this.user)
      .then(
        accounts => {
          this.accounts = accounts;
        },
        error => {
        }
      );
  }//fin getAccounts


}



import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Bank} from "../../../../models/bank/bank";
import {BankService} from "../../../../services/bank/bank.service";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-bank-create',
  templateUrl: './bank.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class BankCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Bank;
  banks: Bank[];

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private bankService: BankService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item = new Bank();
  }

  ngOnChanges(): void{
    this.item = new Bank();
  }//end ngOnChanges

  //create object
  save(form : any){
    this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.bankService.createBank(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Bank();
          this.created.emit("created");
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
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new Bank();
  }



}

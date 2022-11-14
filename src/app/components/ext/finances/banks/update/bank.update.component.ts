/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Agency} from '../../../../models/agency/agency';
import {AgencyService} from '../../../../services/agency/agency.service';
import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Bank} from "../../../../models/bank/bank";
import {BankService} from "../../../../services/bank/bank.service";
import {LibraryService} from "../../../../services/app/library.service";

@Component({
  selector: 'it-bank-update',
  templateUrl: './bank.update.component.html',
  //styleUrls: ['./bank.component.css']

})

export class BankUpdateComponent implements OnInit, OnChanges{

  visible: boolean = false;
  @Input() item: Bank ;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  banks: Bank[] = [];

  @Output() updated = new EventEmitter<string>();

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
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }//end ngOnChanges

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.bankService.updateBank(this.item)
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



}

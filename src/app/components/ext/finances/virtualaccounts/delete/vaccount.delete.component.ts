/**
 * Created by Utilisateur on 28/03/2017.
 */

/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Compartment} from '../../../../models/compartment/compartment';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {BankService} from "../../../../services/bank/bank.service";
import {Bank} from "../../../../models/bank/bank";
import {LibraryService} from "../../../../services/app/library.service";
import {VirtualAccountService} from "../../../../services/virtualaccount/virtualaccount.service";
import {VirtualAccount} from "../../../../models/virtualaccount/virtualaccount";

@Component({
  selector: 'it-vaccount-delete',
  templateUrl: './vaccount.delete.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class VirtualAccountDeleteComponent implements OnInit, OnChanges{

  constructor(
    private vAccountService: VirtualAccountService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  visible: boolean = false;
  @Input() item: VirtualAccount = null;
  @Input() subject: string;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() deleted = new EventEmitter<string>();

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  delete(){
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
    this.vAccountService.deleteVirtualAccount(this.item.id)
      .then(
        result => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;
          this.deleted.emit("deleted");
        },
        error => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage  = this.libraryService.getServiceErrorText(error);
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }


}

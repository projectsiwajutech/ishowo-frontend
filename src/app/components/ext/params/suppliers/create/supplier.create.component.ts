/**
 * Created by Utilisateur on 26/03/2017.
 */


import {Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

// import { trigger, state,  style,  animate, transition} from '@angular/animations';

import {Supplier} from '../../../../models/supplier/supplier';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-supplier-create',
  templateUrl: './supplier.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class SupplierCreateComponent implements OnInit{

  @Input() subject: string;
  item: Supplier;

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private supplierService: SupplierService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}



  ngOnInit(): void{
    this.user = this.locStorService.getUser();
  }

  //create object
  save(form : any){
	var data = {"name": form.name, "address": form.address};
	this.item = new Supplier(); this.item.name = form.name; this.item.address = form.address;
  this.item.phone = form.phone; this.item.email = form.email;
  this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";

    this.supplierService.createSupplier(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = result;
          this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
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
  }


}

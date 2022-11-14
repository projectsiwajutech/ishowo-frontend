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
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/user/user";
import {Profil} from "../../../../models/profil/profil";
import {ProfileService} from "../../../../services/profil/profil.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-user-create',
  templateUrl: './user.create.component.html',
  //styleUrls: ['./agencies.component.css']
})

export class UserCreateComponent implements OnInit{

  @Input() subject: string;
  item: User;

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil

  constructor(
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.item = new User();
    this.user = this.locStorService.getUser();
  }

  //create object
  save(form : any){
  this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.userService.createAgent(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new User();
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

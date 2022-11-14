/**
 * Created by Utilisateur on 26/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';



import {Supplier} from '../../../../models/supplier/supplier';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {User} from "../../../../models/user/user";
import {UserService} from "../../../../services/user/user.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {LibraryService} from "../../../../services/app/library.service";


@Component({
  selector: 'it-customers',
  templateUrl: './customers.component.html',
  // styleUrls: ['./users.component.css'],

})

export class CustomersComponent implements OnInit{

  customers : User[] = [] ;
  // selectedUpObject: User;
  // selectedDelObject: User;

  isCreateVisible: boolean = false
  isLoading: boolean = false;
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;
  @Input() has_debt: boolean;

  //user connected
  user: Profil;

  constructor(
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getUsers();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of users
  getUsers(): void {
    this.isLoading = true;  this.customers = [];
    this.userService.getCustomers(this.user)
      .then(
        agents => {
        this.isLoading = false;
        this.customers = agents;
        if(this.has_debt === true){
          if(this.customers !== null){
            this.customers = agents.filter( (customerItem: User) => customerItem.balance < 0);
          }
        }
      },
        error => {
            this.customers = [];
          this.isLoading = false;
        }
    );
  }//fin getUsers

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getUsers();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getUsers();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getUsers();
  }//fin updateOnDelete



  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  goBack(): void {
    this.location.back();
  }

}

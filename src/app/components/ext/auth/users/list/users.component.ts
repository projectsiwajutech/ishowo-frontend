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


@Component({
  selector: 'it-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})

export class UsersComponent implements OnInit{

  agents : User[] = [] ;
  selectedUpObject: User;
  selectedDelObject: User;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getUsers();
  }

  //get list of users
  getUsers(): void {
    this.isLoading = true;  this.agents = [];
    this.userService.getAgents(this.user)
      .then(
        agents => {
        this.isLoading = false;
        this.agents = agents;
      },
        error => {
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


  //select for update
  selectForUpdate(obj: User): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: User): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate




  goBack(): void {
    this.location.back();
  }

}

/**
 * Created by Utilisateur on 26/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';



import {Supplier} from '../../../../models/supplier/supplier';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";


@Component({
  selector: 'it-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],

})

export class SupplierComponent implements OnInit{

  suppliers : Supplier[] = [] ;
  selectedUpObject: Supplier;
  selectedDelObject: Supplier;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

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
    this.getSuppliers();
  }

  //get list of suppliers
  getSuppliers(): void {
    this.isLoading = true;  this.suppliers = [];
    this.supplierService.getSuppliers(this.user)
      .then(
        suppliers => {
        this.isLoading = false;
        this.suppliers = suppliers;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getSuppliers

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getSuppliers();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getSuppliers();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getSuppliers();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Supplier): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Supplier): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate




  goBack(): void {
    this.location.back();
  }

}

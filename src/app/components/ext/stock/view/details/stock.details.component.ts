

import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';
import {Profil} from "../../../../models/profil/profil";
import {ProductInStock} from "../../../../models/product/productinstock";
import {ProductService} from "../../../../services/product/product.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";


@Component({
  selector: 'it-stock-details',
  templateUrl: './stock.details.component.html',
  //styleUrls: ['./orders.component.css']

})

export class StockDetailsComponent implements OnInit{

  @Input() item: ProductInStock;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  //user connected
  user: Profil;

  constructor(
    private productService: ProductService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
  }

  //create object
  save(): void{
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.productService.updateStockView(this.item, this.user)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.statusMessage = "Stock modifié avec succès";
          //this.visible = false;

          // /this.item = result;
          this.item = new ProductInStock();
          this.closed.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }//fin save

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //get author
  getAuthor(obj: Profil): string{
    let result: string = "";
    result = (obj.user !== null)? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getAuthor


  //hide the form
  hideDetailForm() : void {
    this.closed.emit("closed");
  }//fin hideForm


}

import { LibraryService } from './../../../../services/app/library.service';
import { ProductService } from './../../../../services/product/product.service';
import { ProductInStock } from './../../../../models/product/productinstock';
import { User } from './../../../../models/user/user';
import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';
// import {MdSnackBar} from '@angular/material';

import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-products-search',
  templateUrl: './products.search.component.html',
  //styleUrls: ['banks.component.css']
})

export class ProductSearchComponent implements OnInit{

  stock_view: ProductInStock[] = [] ;
  isListVisible: boolean = true;
  productSearchName: string;

  isCreateVisible: boolean = false; isLoadingStock: boolean = false;
  isLoading: boolean = false;
  @Output() selected = new EventEmitter<User>();

  //user connected
  user: Profil;

  constructor(
    private productService: ProductService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
    //public snackBar: MdSnackBar
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getStockView();
  }

    //add product line
  addProductLine(obj: ProductInStock): void{
    //check if undefined
    // if(this.item.lines === undefined || this.item.lines === null ){this.item.lines = []; }

    //check qty
    if(obj.quantity_sell > obj.quantity){   this.libraryService.showMessage("Veuillez saisir une quantité inférieure!"); obj.quantity_sell = 0; return;    }
    if(obj.quantity_sell <= 0){   this.libraryService.showMessage("Veuillez saisir une quantité valide!");  return;    }

    //check if existing
    // let searchProdList: ProductInStock[] = this.item.lines.filter(x => x.id === obj.id);
    // if(searchProdList.length !== 0){
    //   let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
    //   this.item.lines[searchProdIndex].quantity_sell = this.item.lines[searchProdIndex].quantity_sell + obj.quantity_sell;
    // }else{
    //   //add
    //   let copiedPStock: ProductInStock = this.libraryService.copy(obj);
    //   this.item.lines.push(copiedPStock);
    // }

    //clear
    obj.quantity_sell = 0;
    this.productSearchName = "";

  }//fin addProductLine

  //get list of products stock view
  getStockView(): void {
    this.stock_view = []; this.isLoadingStock = true;
    this.productService.getStockViewForSale(this.user)
      .then(
        stock_view => {
          this.stock_view = stock_view; this.isLoadingStock = false;
        },
        error => {this.isLoadingStock = false;}
      );
  }//fin getStockView

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  goBack(): void {
    this.location.back();
  }

}

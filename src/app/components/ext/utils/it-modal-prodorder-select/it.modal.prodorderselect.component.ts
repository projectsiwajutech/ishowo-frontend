import { ProductParam } from './../../../models/query/ProductParam';
import { LibraryService } from './../../../services/app/library.service';
import { ProdMeasureType } from './../../../models/prodmeasuretype/prodmeasuretype';
import { Profil } from './../../../models/profil/profil';
import { ProductInStock } from './../../../models/product/productinstock';
import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import {AppService} from '../../../services/app/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap';




@Component({
  selector: 'it-modal-prodorderselect',
  templateUrl: './it.modal.prodorderselect.component.html',
  styleUrls: ['./it.modal.prodorderselect.component.css']
})

export class ItModalProductOrderSelectComponent implements OnInit {

  @Input() file: string;

  @Input() title: string;
  @Input() visible: boolean = true;
  @Output() closed = new EventEmitter<ProductInStock[]>();
  items: any[] = [];
  @Input() user: Profil;
  @Input() products: ProdMeasureType[];
  param: ProductParam = new ProductParam();

  @Input() test: string = "aa";

  pageStartIndex : number = 0; limitTable: number[] = []; pageLimit: number = 0;

  public constructor(
    private  appService: AppService, private libraryService: LibraryService,
    private sanitizer: DomSanitizer, public bsModalRef: BsModalRef) {
       this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  ngOnInit(): void {
    if (this.products === undefined) {
      this.products = [];
     }
  }

 //hide form 
 hideForm() {
   this.closed.emit([]);
   this.bsModalRef.hide();
 }//end hideForm

   //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

 //add products 
 addProducts() {
   let productsForOrder: ProductInStock[] = [];
   let checkedProducts: ProdMeasureType[] = this.products.filter((x: any) =>  x.is_checked === true );

   //start for
   for(let i: number = 0; i < checkedProducts.length; i++){
            //check qty format
        if(!this.libraryService.isValidNumber(checkedProducts[i].quantity_order))
        {this.libraryService.showMessage('Quantité non valide'); return;}
        if(!this.libraryService.isValidNumber(checkedProducts[i].purchase_price))
        {this.libraryService.showMessage('Prix d\'achat non valide'); return;}
        if(!this.libraryService.isValidNumber(checkedProducts[i].selling_price))
        {this.libraryService.showMessage('Prix de vente non valide'); return;}

        //now adding 
        let prodLine: ProductInStock = new ProductInStock();
        prodLine.product = checkedProducts[i];
        prodLine.quantity = checkedProducts[i].quantity_order;
        prodLine.purchase_price = checkedProducts[i].purchase_price;
        prodLine.selling_price = checkedProducts[i].selling_price;
               //barcode 
        if (checkedProducts[i].barcode !== '' ||
        checkedProducts[i].barcode !== null ||
        checkedProducts[i].barcode !== undefined) {
          prodLine.barcode = checkedProducts[i].barcode;
        }

        if (checkedProducts[i].date_exp !== null && checkedProducts[i].date_exp !== undefined){
          prodLine.expiration_date = checkedProducts[i].date_exp;
        }
         productsForOrder.push(this.libraryService.copy(prodLine));

         this.test = "yes";

   } //end for

   this.closed.emit(productsForOrder);
   this.bsModalRef.hide();
 }//fin addProducts

 //get checked products 
 getAddedProducts(): number {
     let checkedProductsCount: number = this.products.filter((x: any) =>  x.is_checked === true ).length;
     return checkedProductsCount;
 }//fin getAddedProducts

//paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  //add product to list 
  // addProductToList(index: number){
  //       //if(!this.libraryService.isValidNumber(checkedProducts[i].quantity_order))
  //       // {this.libraryService.showMessage('Quantité non valide'); return;}
  //       // if(!this.libraryService.isValidNumber(checkedProducts[i].purchase_price))
  //       // {this.libraryService.showMessage('Prix d\'achat non valide'); return;}
  //       // if(!this.libraryService.isValidNumber(checkedProducts[i].selling_price))
  //       // {this.libraryService.showMessage('Prix de vente non valide'); return;}


  //   this.products[index].is_checked = true;
  //   this.param.product = "";
  //   // this.products = this.internalProducts;
  // }//fin addProductToList

}


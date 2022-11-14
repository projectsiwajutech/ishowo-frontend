

import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Compartment} from '../../../../models/compartment/compartment';
import {StockLimit} from "../../../../models/stocklimit/stocklimit";
import {Product} from "../../../../models/product/product";
import {ProductService} from "../../../../services/product/product.service";
import {CompartmentService} from "../../../../services/compartment/compartment.service";
import {ProductInStock} from "../../../../models/product/productinstock";
import {StockTransfer} from "../../../../models/stocktransfer/stocktransfer";
import {LibraryService} from "../../../../services/app/library.service";
import {Profil} from "../../../../models/profil/profil";
import {StockTransferService} from "../../../../services/stocktransfer/stocktransfer.service";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-stock-transfer-create',
  templateUrl: './stock.transfer.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class StockTransferCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  @Output() visibility_change = new EventEmitter<boolean>();

  item: StockTransfer;
  products: Product[]; allProducts: Product[];
  compartments: Compartment[];
  stock_view: ProductInStock[] = [];
  current_stock_view: ProductInStock[] = [];
  isLoadingStock: boolean = false;

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private stockTransferService: StockTransferService,
    private productService: ProductService,
    private compartmentService: CompartmentService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private router: Router,
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.item = new StockTransfer();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.item = new StockTransfer(); this.isLoadingStock = false;
    this.getStockView(); this.getCompartments();
  }//end ngOnChanges


  //create object
  save(form : any){
    this.item.lines = this.current_stock_view;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.stockTransferService.createTransfer(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.statusMessage = "Opération enregistrée avec succès";
          //this.visible = false;

          // /this.item = result;
          this.item = new StockTransfer();
          this.current_stock_view = [];

          setTimeout(() =>{
            this.isSaving = false; this.isCompleted = false; this.isSuccess = true;
            this.statusMessage = "";
          }, 2000);
          //this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }//fin save

  //check qty to transfer
  checkQtyTransfer(obj: ProductInStock): void {
    if(obj.quantity_transfer > obj.quantity || obj.quantity_transfer < 0){
      obj.quantity_transfer = 0;
    }
  }//fin checkQtyTransfer

  //can save transfer
  canSaveTransfer(): boolean{
    let stateCompartment: boolean = (this.item.source === null || this.item.source === undefined || this.item.destination === null || this.item.destination === undefined || this.item.source.id === this.item.destination.id );
    let stateCurrentStockExist: boolean = (this.current_stock_view === null || this.current_stock_view === undefined  ||
      this.current_stock_view.length === 0 || (this.current_stock_view.filter(x => this.libraryService.isValidNumber(x.quantity_transfer) && x.quantity_transfer !== 0  ).length === 0) );
    //let emptyLinesCount : number = this.current_stock_view.filter(x => x.quantity_transfer === 0).length;

    if(stateCompartment === true || stateCurrentStockExist === true ){return false;} else { return true; }
  }//fin canSaveTransfer

  //get compartment selected stock
  getCompStock(): void{
    this.getStockView();
  }//fin getCompStock

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments

  //get list of products stock view
  getStockView(): void {
    this.stock_view = []; this.isLoadingStock = true;
    this.productService.getStockView(this.user)
      .then(
        stock_view => {
          this.isLoadingStock = false;
          this.stock_view = stock_view;
          if(this.item.source !== undefined && this.item.source !== null){
            this.current_stock_view = this.stock_view.filter(x => x.compartment.id === this.item.source.id);
          }
        },
        error => {
          this.isLoadingStock = false;
        }
      );
  }//fin getStockView


  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
    this.visibility_change.emit(this.visible);
  }//fin showCreationForm

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new StockTransfer();
    this.visibility_change.emit(this.visible);
  }//fin hideForm



}

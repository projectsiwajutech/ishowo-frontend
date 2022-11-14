import { ProductSearchComponent } from './../../../params/products/search/products.search.component';
/**
 * Created by Utilisateur on 31/03/2017.
 */
import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {OrderService} from '../../../../services/order/order.service';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {CategoryService} from '../../../../services/category/category.service';
import {ProductService} from '../../../../services/product/product.service';
import {MeasureTypeService} from '../../../../services/measuretype/measuretype.service';

import {LibraryService} from '../../../../services/app/library.service';
import {Order} from "../../../../models/order/order";
import {Compartment} from "../../../../models/compartment/compartment";
import {Supplier} from "../../../../models/supplier/supplier";
import {Category} from "../../../../models/category/category";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {Product} from "../../../../models/product/product";
import {ProductInStock} from "../../../../models/product/productinstock";
import {Sale} from "../../../../models/sale/sale";
import {SaleService} from "../../../../services/sale/sale.service";
import {PrmProdStkView} from "../../../../models/query/PrmProdStkView";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";

@Component({
  selector: 'it-sale-partial-create',
  templateUrl: './sale.partial.create.component.html',
  //styleUrls: ['./agencies.component.css']
})

export class SalePartialCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Sale;
  productSearchName: string;
  pdfTitle: string = "Facture";

  stock_view: ProductInStock[] = [];

  quantity: number=0; selling_price: number=0; reliquat: number = 0;

  //form related objects
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  isInvoiceVisible: boolean = false;  generatedInvoice: string = "";
  isLoadingStock: boolean = false;  display: boolean = false;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private saleService: SaleService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.subject = "Vente";
  }



    showDialog() {
        this.display = true;
    }

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getStockView();
    this.item = new Sale(); //this.selectedProdStockItem = new ProductInStock();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.getStockView();
    this.item = new Sale();
  }//end ngOnChanges


  //add product line
  addProductLine(obj: ProductInStock): void{
    //check if undefined
    if(this.item.lines === undefined || this.item.lines === null ){this.item.lines = []; }

    //check qty
    if(obj.quantity_sell > obj.quantity){   this.libraryService.showMessage("Veuillez saisir une quantité inférieure!"); obj.quantity_sell = 0; return;    }
    if(obj.quantity_sell <= 0){   this.libraryService.showMessage("Veuillez saisir une quantité valide!");  return;    }

    //check if existing
    let searchProdList: ProductInStock[] = this.item.lines.filter(x => x.id === obj.id);
    if(searchProdList.length !== 0){
      let searchProdIndex = this.item.lines.indexOf(searchProdList[0]);
      this.item.lines[searchProdIndex].quantity_sell = this.item.lines[searchProdIndex].quantity_sell + obj.quantity_sell;
    }else{
      //add
      let copiedPStock: ProductInStock = this.libraryService.copy(obj);
      this.item.lines.push(copiedPStock);
    }

    //clear
    obj.quantity_sell = 0;
    this.productSearchName = "";

  }//fin addProductLine

  //remove product line
  removeProductLine(index: number) : void{
    this.item.lines.splice(index, 1);
  }//fin removeProductLine

  //can add product
  canAddProd(): boolean{
    // let stateProduct: boolean = (this.selectedProduct === null || this.selectedProduct === undefined );
    // let stateQuantity: boolean = (this.quantity ===0 || !this.libraryService.isValidNumber(this.quantity) );
    // let statePurchasePrice: boolean = (this.selling_price ===0 || !this.libraryService.isValidNumber(this.selling_price) );
    // let stateStockProd: boolean = (this.selectedProdStockItem.quantity === 0 || this.selectedProdStockItem.quantity === undefined
    //   || this.selectedProdStockItem.quantity > this.quantity);

    // if(stateProduct === true || stateQuantity === true || statePurchasePrice === true){return false;} else { return true; }
    return true;
  }//fin canAddProd

  //can save sale
  canSaveSale(): boolean{
    let stateAmountReceived: boolean = (this.item.amount_received === null || this.item.amount_received === undefined );
    //let stateAmountInsufficient: boolean = (this.item.amount_received < this.getTotal() );
    let stateCustomer: boolean = (this.item.customer === null || this.item.customer === undefined  || this.item.customer.lastname === undefined 
     || this.item.customer.firstname === undefined || this.item.customer.phone === undefined  );
    let stateProductLines: boolean = (this.item.lines === null || this.item.lines === undefined
     || this.item.lines.length === 0);
    let isSavingSale: boolean = this.isSaving;

    if( stateAmountReceived === true || stateProductLines === true
    || isSavingSale === true || stateCustomer === true ){return false;} else { return true; }
  }//fin canSaveSale

  //can save devis
  canSaveDevis(): boolean{
    let stateProductLines: boolean = (this.item.lines === null || this.item.lines === undefined || this.item.lines.length === 0);
    let isSavingSale: boolean = this.isSaving;
    if(stateProductLines === true  || isSavingSale === true){return false;} else { return true; }
  }//fin canSaveDevis

  //get total
  getTotal(): number {
    if(this.item.lines === undefined || this.item.lines === null ){ return 0; }
    if(this.item.lines.length === 0  ){ return 0; }

    let total: number = 0;
    total = this.item.lines
      .map(p => p.quantity_sell * p.selling_price)
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getTotal

  //create object
  saveSale(){
    this.pdfTitle = "Facture";
    //conditions reunies ou non
    if(this.canSaveSale() === false){
      this.libraryService.showMessage("Veuillez vérifier toutes les informations et réessayer");  return;
    }

    //checks
    if(this.item.lines === undefined || this.item.lines === null){this.item.lines = [];}
    if(this.item.lines.length === 0){this.libraryService.showMessage("Veuillez aujouter des produits à cette commande"); return;}

  //action
    this.item.agent = this.user;
	  this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.generatedInvoice = ""; this.isInvoiceVisible = false;
    this.saleService.createSale(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Sale();
          this.reliquat = 0;
          this.statusMessage = "Vente créée avec succès";
          this.created.emit("created");
          setTimeout(() =>   {  this.isCompleted = false;   } , 1000);

          //print invoice
          if(result !== null){
            this.generatedInvoice = result.filename;
            this.isInvoiceVisible = true;
          }
          this.getStockView();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }//end saveSale


  //create object
  saveDevis(){
    this.pdfTitle = "Devis";
     //checks
    if(this.item.lines === undefined || this.item.lines === null){this.item.lines = [];}
    if(this.item.lines.length === 0){this.libraryService.showMessage("Veuillez aujouter des produits à cette commande"); return;}

    //action
    this.item.agent = this.user;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.generatedInvoice = ""; this.isInvoiceVisible = false;
    this.saleService.createDevis(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Sale();
          this.reliquat = 0;
          this.statusMessage = "Devis créé avec succès";
          this.created.emit("created");
          setTimeout(() =>   {  this.isCompleted = false;   } , 1000);

          //print invoice
          if(result !== null){
            this.generatedInvoice = result.filename;
            this.isInvoiceVisible = true;
          }
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
        }
      );
  }//end saveDevis

  //amount received event
  onAmountReceivedChange(): void{
    // if(!this.libraryService.isValidNumber(this.item.amount_received)) this.item.amount_received = 0;

    let total: number = this.getTotal();
    // if(!this.libraryService.isValidNumber(total)) total = 0;

    this.reliquat = this.item.amount_received - total;
    // if(!this.libraryService.isValidNumber(this.reliquat)) this.reliquat = 0;
  }//fin onAmountReceivedChange

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    let link = ['/app/sales_main'];
    this.router.navigate(link);
  }

  //update on close
  updateOnClose($event: any): void {
    this.isInvoiceVisible = $event;
  }

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

//show form to select devis
  selectDevisForm(): void{
   // alert("ok");

  }//fin selectDevisForm

    //liste les ventes
  listSale(): void{
    let link = ['/app/sales_list'];
    this.router.navigate(link);
  }//fin listSale


}

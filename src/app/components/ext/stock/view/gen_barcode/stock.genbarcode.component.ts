import { PeriodParam } from './../../../../models/query/PeriodParam';
import {Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {ProductInStock} from "../../../../models/product/productinstock";
import {ProductService} from '../../../../services/product/product.service';
import {ProductParam} from "../../../../models/query/ProductParam";
import {Category} from "../../../../models/category/category";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {Compartment} from "../../../../models/compartment/compartment";
import {CategoryService} from "../../../../services/category/category.service";
import {MeasureTypeService} from "../../../../services/measuretype/measuretype.service";
import {CompartmentService} from "../../../../services/compartment/compartment.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {AgencyService} from "../../../../services/agency/agency.service";
import {Agency} from "../../../../models/agency/agency";
import {LibraryService} from "../../../../services/app/library.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'it-stock-gen-barcode',
  templateUrl: './stock.genbarcode.component.html',
  //styleUrls: ['./stock.genbarcode.css']

})

export class StockGenBarCodeComponent implements OnInit, OnChanges{

  @Input() subject: string;

  //prodName: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  stock_view: ProductInStock[] = [];
  selectedUpObject: ProductInStock;
  selectedExpdObject: ProductInStock;

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false;
  isStockViewPdfVisible: boolean = false;  generatedStockViewPdf: string = "";

  //filter variables
  param: ProductParam = new ProductParam();
  categories: Category[];
  measureTypes: MeasureType[];
  compartments: Compartment[];
  agencies: Agency[];
  pageStartIndex : number = 0;  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private measureTypeService: MeasureTypeService,
    private compartmentService: CompartmentService,
    private agencyService: AgencyService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
    this.getStockView();
    this.getCategories(); this.getMeasureTypes(); this.getCompartments(); this.getAgencies();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
  }

  //get list of products stock view
  getStockView(): void {
    this.isLoading = true;  this.stock_view = [];
    this.productService.getStockView(this.user)
      .then(
        stock_view => {
          this.isLoading = false;
          this.stock_view = stock_view;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getStockView

  //print list of barcodes
  generateBarCodes(): void {
    //list of product to generate 
    let param: PeriodParam = new PeriodParam();
    let productsChecked : ProductInStock[] = this.stock_view.filter(x => x.is_checked === true);
    param.products = productsChecked;
    param.agent = this.user;

    this.isPrinting = true;
    //action
    this.productService.printBarCodes(param)
      .then(
        pdf => {
          this.isPrinting = false;

          let fileBlob = pdf.blob();  let blob = new Blob([fileBlob], {   type: 'application/pdf'     });
          let filename = 'ISHOWO_STOCK.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);  window.open(url,'_blank');
          
          // if(pdf !== null) {
          //   this.isStockViewPdfVisible = true;
          //   this.generatedStockViewPdf = pdf.filename;
          // }
        },
        error => {
          this.isPrinting = false;
          alert("Une erreur est survenue");
        }
      );
  }//fin generateBarCodes

  //update on close
  updateOnPdfClose(event: any): void {
    this.isStockViewPdfVisible = event;
  }//fin updateOnPdfClose


  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //hide the form
  hideViewForm() : void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //select for update
  viewDetails(obj: ProductInStock): void{
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //expand product stock
  expandProduct(obj: ProductInStock): void{
    this.selectedExpdObject = obj;
  }//fin expandProduct

  //update list on component close
  updateOnClose($event: any) : void {
    this.selectedUpObject = null;
    this.getStockView();
  }//fin updateOnClose

  //update list on hide
  updateOnHide($event: any) : void {
    this.selectedExpdObject = null;
    this.getStockView();
  }//fin updateOnClose



  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          let emptyObj : Category =  new Category(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.categories.push(emptyObj);
          categories.filter(obj => this.categories.push(obj));
        },
        error => {
        }
      );
  }//fin getCategories

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj : MeasureType =  new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          measureTypes.filter(obj => this.measureTypes.push(obj));
        },
        error => {
        }
      );
  }//fin getMeasureTypes

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          let emptyObj : Compartment =  new Compartment(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.compartments.push(emptyObj);
          if(compartments !== null){
              compartments.filter(obj => this.compartments.push(obj));
          }
        },
        error => {
        }
      );
  }//fin getCompartments

  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          let emptyObj : Agency =  new Agency(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.agencies.push(emptyObj);
          agencies.filter(obj => this.agencies.push(obj));
        },
        error => {
        }
      );
  }//fin getAgencies

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  //get stock value on selling
  getStockValueOnSellingPrice(items: ProductInStock[]): number{
    if(items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.quantity * p.selling_price)
      .reduce((sum, current) => sum + current);
      return total;
  }//fin getStockValueOnSellingPrice

   //get stock value purchase price
  getStockValueOnPurchasePrice(items: ProductInStock[]): number{
    if(items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.quantity * p.purchase_price)
      .reduce((sum, current) => sum + current);
      return total;
  }//fin getStockValueOnPurchasePrice

     //get stock value revenue
  getStockValueOnRevenue(items: ProductInStock[]): number{
    if(items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => (p.quantity * (p.selling_price - p.purchase_price)) )
      .reduce((sum, current) => sum + current);
      return total;
  }//fin getStockValueOnRevenue

  //set check state 
  setCheckState(item: any): void {
      item.is_checked = !item.is_checked;
  }//fin setCheckState

  //get selected stock 
  getSelectedStock(): number {
    return this.stock_view.filter(x => x.is_checked === true).length;
  }//end getSelectedStock

}


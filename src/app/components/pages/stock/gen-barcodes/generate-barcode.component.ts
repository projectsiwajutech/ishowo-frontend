import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Category } from 'src/app/shared/models/category/category';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import * as FileSaver from 'file-saver';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductOnRetailComponent } from '../productStocks/put-on-retail/product-on-retail.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-generate-barcode',
  templateUrl: './generate-barcode.component.html',
  styleUrls: ['./generate-barcode.component.scss']
})
export class GenerateBarcodeComponent implements OnInit, OnChanges {

  @Input() subject: string;

  //prodName: string;

  //form related objects
  visible: boolean = true; page  : number = 1; pageSize  : number = 30;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  printParam: PeriodParam = new PeriodParam();
  stock_view: ProductInStock[] = [];
  selectedUpObject: ProductInStock;
  selectedExpdObject: ProductInStock;

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false; noData: boolean;
  isStockViewPdfVisible: boolean = false; generatedStockViewPdf: string = "";

  //filter variables
  param: ProductParam = new ProductParam();
  categories: Category[];
  measureTypes: MeasureType[];
  compartments: Compartment[];
  agencies: Agency[];
  pageStartIndex: number = 0; limitTable: number[] = []; pageLimit: number = 0;

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
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.printParam = new PeriodParam();
    this.printParam.agent = this.user;
    this.param = new ProductParam();
    this.getStockView();
    this.getCategories(); this.getMeasureTypes(); this.getCompartments(); this.getAgencies();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
    this.printParam = new PeriodParam();
  }

  //get list of products stock view
  getStockView(): void {
    this.isLoading = true; this.stock_view = [];
    this.productService.getStockView(this.user)
      .then(
        stock_view => {
          this.isLoading = false;
          if (stock_view.length === 0) { this.noData = true; } else { this.noData = false; }
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
    this.ngxService.start();
    let productsChecked: ProductInStock[] = this.stock_view.filter(x => x.is_checked === true);
    this.printParam.agent = this.user;
    this.printParam.products = productsChecked;

    this.isPrinting = true;
    //action
    this.productService.generateBarCodes(this.printParam.products, this.printParam.agent)
      .then(
        pdf => {
          this.isPrinting = false;
          let newRouterLink = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([newRouterLink])
          });
          this.ngxService.stop();
        },
        error => {
          this.ngxService.stop();
          this.isPrinting = false;
          // alert("Une erreur est survenue");
        }
      );
  }//fin generateBarCodes

  //update on close
  updateOnPdfClose(event: any): void {
    this.isStockViewPdfVisible = event;
  }//fin updateOnPdfClose


  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //hide the form
  hideViewForm(): void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //view product stock
  ViewProduct(obj: ProductInStock): void {
    this.selectedExpdObject = obj;
    const modalRef = this.modalService.open(ProductOnRetailComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
  }//fin viewProduct

  //select for update
  viewDetails(obj: ProductInStock): void {
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //expand product stock
  expandProduct(obj: ProductInStock): void {
    this.selectedExpdObject = obj;
  }//fin expandProduct

  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          let emptyObj: Category = new Category(); emptyObj.id = 0; emptyObj.name = "Toutes";
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
          let emptyObj: MeasureType = new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
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
          let emptyObj: Compartment = new Compartment(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.compartments.push(emptyObj);
          if (compartments !== null) {
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
          let emptyObj: Agency = new Agency(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.agencies.push(emptyObj);
          agencies.filter(obj => this.agencies.push(obj));
        },
        error => {
        }
      );
  }//fin getAgencies

  //paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  //get stock value on selling
  getStockValueOnSellingPrice(items: ProductInStock[]): number {
    if (items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.quantity * p.selling_price)
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getStockValueOnSellingPrice

  //get stock value purchase price
  getStockValueOnPurchasePrice(items: ProductInStock[]): number {
    if (items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.quantity * p.purchase_price)
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getStockValueOnPurchasePrice

  //get stock value revenue
  getStockValueOnRevenue(items: ProductInStock[]): number {
    if (items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => (p.quantity * (p.selling_price - p.purchase_price)))
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getStockValueOnRevenue

  //set check state
  setCheckState($event: any, item: any): void {
    item.is_checked = $event.target.checked;
  }//fin setCheckState

  //get selected stock
  getSelectedStock(): number {
    return this.stock_view.filter(x => x.is_checked === true).length;
  }//end getSelectedStock

}

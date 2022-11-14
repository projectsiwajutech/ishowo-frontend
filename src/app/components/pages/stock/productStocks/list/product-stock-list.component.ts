import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Category } from 'src/app/shared/models/category/category';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductStockViewComponent } from '../viewdetail/product-stock-view.component';
import { ProductOnRetailComponent } from '../put-on-retail/product-on-retail.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-product-stock-list',
  templateUrl: './product-stock-list.component.html',
  styleUrls: ['./product-stock-list.component.scss']
})
export class ProductStockListComponent implements OnInit, OnChanges {

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
  page  : number = 1;
  pageSize  : number = 30;

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
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getStockView();
    this.getCategories(); this.getMeasureTypes(); this.getCompartments(); this.getAgencies();
    this.param = new ProductParam();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.param = new ProductParam();
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

  //search list of products stock view
  searchStockView(): void {
    this.isLoading = true; this.stock_view = [];
    let prodObj: any = { product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };

    this.productService.searchStockView(this.user, prodObj)
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
  }//fin searchStockView

  //print list of sales
  printData(): void {
    this.ngxService.start();
    this.isPrinting = true;
    this.productService.printStockView(this.user)
      .then(
        pdf => {
          this.isPrinting = false;

          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_STOCK.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.ngxService.stop();
          window.open(url, '_blank');

          // if(pdf !== null) {
          //   this.isStockViewPdfVisible = true;
          //   this.generatedStockViewPdf = pdf.filename;
          // }
        },
        error => {
          this.isPrinting = false;
          this.ngxService.stop();
        }
      );
  }//fin printData

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

  //select for update
  viewDetails(obj: ProductInStock): void {
    this.selectedUpObject = obj;
  }//fin selectForUpdate

  //expand product stock
  expandProduct(obj: ProductInStock): void {
    this.selectedExpdObject = obj;
    const modalRef = this.modalService.open(ProductStockViewComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
  }//fin expandProduct

  //view product stock
  ViewProduct(obj: ProductInStock): void {
    this.selectedExpdObject = obj;
    const modalRef = this.modalService.open(ProductOnRetailComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
  }//fin viewProduct

  //update list on component close
  updateOnClose($event: any): void {
    this.selectedUpObject = null;
    this.searchStockView();
  }//fin updateOnClose

  //update list on hide
  updateOnHide($event: any): void {
    this.selectedExpdObject = null;
    this.searchStockView();
  }//fin updateOnClose



  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          let emptyObj: Category = new Category(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.categories.push(emptyObj);

          if (categories !== null) {
            categories.filter(obj => this.categories.push(obj));
          }
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

          if (agencies !== null) {
            agencies.filter(obj => this.agencies.push(obj));
          }
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


  //hide detail form
  updateOnClosed($event: any): void {
    this.visible = true;
  }
}

import { SaleTarget } from 'src/app/shared/models/saletarget/saletarget';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Category } from 'src/app/shared/models/category/category';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';

@Component({
  selector: 'app-hs-products-list',
  templateUrl: './hs-products-list.component.html',
  styleUrls: ['./hs-products-list.component.scss']
})
export class HsProductsListComponent implements OnInit {

  underStockList: ProductInStock[] = [];
  @Input() isOnDashBoard: boolean = true;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean; page  : number = 1; pageSize  : number = 30;

  //filter variables
  param: ProductParam = new ProductParam();
  categories: Category[];
  measureTypes: MeasureType[];
  compartments: Compartment[];
  saleTargetList: SaleTarget[];
  agencies: Agency[];

  //user connected
  user: Profil;

  constructor(
    private stockLimitService: StockLimitService,
    private measureTypeService: MeasureTypeService,
    private productService: ProductService,
    private locStorService: LocalStorageService,
    private categoryService: CategoryService,
    private compartmentService: CompartmentService,
    private agencyService: AgencyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getUnderStockProdList();
    this.getMeasureTypes();
  }

  //get list of stock limit
  getUnderStockProdList(): void {
    this.isLoading = true; this.underStockList = [];
    this.stockLimitService.getProdUnderStockLimit(this.user)
      .then(
        underStockList => {
          this.isLoading = false;
          if (underStockList.length === 0) { this.noData = true; } else { this.noData = false; }
          this.underStockList = underStockList;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getUnderStockProdList

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm(): void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj: MeasureType = new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          if (measureTypes !== null) {
            measureTypes.filter(obj => this.measureTypes.push(obj));
          }
          //this.measureTypes = measureTypes;
        },
        error => {
        }
      );
  }//fin getMeasureTypes


   //search list of products stock view
   searchStockView(): void {
    this.isLoading = true; this.underStockList = [];
    let prodObj: any = { product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };

    this.productService.searchStockView(this.user, prodObj)
      .then(
        underStockList => {
          this.isLoading = false;
          if (underStockList.length === 0) { this.noData = true; } else { this.noData = false; }
          this.underStockList = underStockList;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchStockView


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
}

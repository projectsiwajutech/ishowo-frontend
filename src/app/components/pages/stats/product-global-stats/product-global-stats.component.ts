import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { GlobalReport } from 'src/app/shared/models/stats/globalreport';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'app-product-global-stats',
  templateUrl: './product-global-stats.component.html',
  styleUrls: ['./product-global-stats.component.scss']
})
export class ProductGlobalStatsComponent implements OnInit {

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();


  //report var
  report: GlobalReport = new GlobalReport();
  isLoadingStats: boolean = false;
  param: PeriodParam = new PeriodParam();
  product_types: ProdMeasureType[] = []; isLoadingStock: boolean = false;
  productSearchName: string = "";

  //user connected
  user: Profil;

  constructor(
    private statsService: StatsService,
    private productService: ProductService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getStatsByPeriod();
    this.getProductTypes();
  }


  //show by period stats
  getStatsByPeriod(): void {
    this.isLoadingStats = true;
    this.statsService.getProductPeriodGlobalStats(this.param)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if (this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.report = new GlobalReport();
          this.isLoadingStats = false;
        }
      );
  }//fin getStatsByPeriod

  //get product name
  getProductName(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) {
      if (obj.product !== null && obj.product !== undefined) { return obj.product.product.name; } else { return ""; }
    } else { return ""; }
  }//fin getProductName

  //get product measure type
  getProductMeasureType(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) {
      if (obj.product !== null && obj.product !== undefined) { return "(" + obj.product.measure_type.name + ")"; } else { return ""; }
    } else { return ""; }
  }//fin getProdMeasureType

  //get product quantity or amount
  getProductQA(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) { return obj.quantity; } else { return 0; }
  }//fin getProdQA

  //On Change Date1
  getSelectedDate1(dateStart: any) {
    let format = new Date(dateStart);
    this.param.startDate = format;
    this.getStatsByPeriod();
  }// fin

  //On Change Date2
  getSelectedDate2(dateEnd: any) {
    let format = new Date(dateEnd);
    format.setHours(23, 59, 59, 999)
    this.param.endDate = format;
    this.getStatsByPeriod();
  }//On Change Date2

  //get list of products stock view
  getProductTypes(): void {
    this.product_types = []; this.isLoadingStock = true;
    this.productService.getProductTypes(this.user)
      .then(
        product_types => {
          this.product_types = product_types; this.isLoadingStock = false;
        },
        error => { this.isLoadingStock = true; }
      );
  }//fin getProductTypes

  //select product
  selectProd(obj: ProdMeasureType): void {
    this.param.startDate = this.DefaultDateOne;
    this.param.endDate = this.DefaultDateTwo;
    this.param.product = obj; this.report = new GlobalReport();
    this.getStatsByPeriod();
  }//fin selectProd

  //can get stats
  canGetStats(): boolean {
    let stateStartDate: boolean = (this.param.product === null || this.param.product === undefined);
    if (stateStartDate === true) { return false; } else { return true; }
  }//fin canGetStats

  //get product name selected
  getProductSelectedName(): string {
    if (this.param === null || this.param === undefined) return "";
    if (this.param.product === null || this.param.product === undefined) return "";
    return this.param.product.product.name;
  }//fin getProductSelectedName

  //get product type selected
  getProductSelectedMeasureType(): string {
    if (this.param === null || this.param === undefined) return "";
    if (this.param.product === null || this.param.product === undefined) return "";
    return this.param.product.measure_type.name;
  }//fin getProductMeasureType


}

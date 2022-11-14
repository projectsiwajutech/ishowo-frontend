import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'app-product-sold-stats',
  templateUrl: './product-sold-stats.component.html',
  styleUrls: ['./product-sold-stats.component.scss']
})
export class ProductSoldStatsComponent implements OnInit {
  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();

  //report var
  reportProdQty: ProductInStock[] = []; reportProdCa: ProductInStock[] = []; reportProdProfit: ProductInStock[] = [];
  isLoadingStatsQty: boolean = false; isLoadingStatsCa: boolean = false; isLoadingStatsProfit: boolean = false;
  param: PeriodParam = new PeriodParam();
  product_types: ProdMeasureType[] = []; isLoadingStock: boolean = false;
  productQtySearchName: string = ""; productCaSearchName: string = ""; productProfitSearchName: string = "";

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
    this.param.startDate = this.DefaultDateOne;
    this.param.endDate = this.DefaultDateTwo;
    this.getProductsStats();
  }

  //show by period stats
  getProductsStats() {
    this.getStatsOnProductQtySoldByPeriod();
    this.getStatsOnProductCaByPeriod();
    this.getStatsOnProductProfitByPeriod();
  }

  //show by period stats
  getStatsOnProductQtySoldByPeriod(): void {
    this.isLoadingStatsQty = true;
    this.reportProdQty = [];
    this.statsService.getProductSoldByQuantityStats(this.param)
      .then(
        result => {
          this.isLoadingStatsQty = false;
          this.reportProdQty = result;
          if (this.reportProdQty === null) this.reportProdQty = [];
        },
        (error: any) => {
          this.reportProdQty = [];
          this.isLoadingStatsQty = false;
        }
      );
  }//fin getStatsOnProductQtySoldByPeriod

  //show by period stats
  getStatsOnProductCaByPeriod(): void {
    this.isLoadingStatsCa = true;
    this.reportProdCa = [];
    this.statsService.getProductSoldByCaStats(this.param)
      .then(
        result => {
          this.isLoadingStatsCa = false;
          this.reportProdCa = result;
          if (this.reportProdCa === null) this.reportProdCa = [];
        },
        (error: any) => {
          this.reportProdCa = [];
          this.isLoadingStatsCa = false;
        }
      );
  }//fin getStatsOnProductCaByPeriod

  //show by period stats
  getStatsOnProductProfitByPeriod(): void {
    this.isLoadingStatsProfit = true;
    this.reportProdProfit = [];
    this.statsService.getProductSoldByProfitStats(this.param)
      .then(
        result => {
          this.isLoadingStatsProfit = false;
          this.reportProdProfit = result;
          if (this.reportProdProfit === null) this.reportProdProfit = [];
        },
        (error: any) => {
          this.reportProdProfit = [];
          this.isLoadingStatsProfit = false;
        }
      );
  }//fin getStatsOnProductProfitByPeriod

  //On Change Date1
  getSelectedDate1(dateStart: any){
    let format = new Date(dateStart);
    format.setHours(24,0,0,0)
    this.param.startDate =  format;
  }// fin 

  //On Change Date2
  getSelectedDate2(dateEnd: any){
    let format = new Date(dateEnd);
    format.setHours(23,59,59,999)
    this.param.endDate = format;
  }//On Change Date2

  //can get stats
  canGetStats(): boolean {
    let stateStartDate: boolean = (this.param.product === null || this.param.product === undefined);
    if (stateStartDate === true) { return false; } else { return true; }
  }//fin canGetStats

  //get product name selected
  getProductSelectedName(): string {
    if (this.param === null || this.param === undefined) return "";
    if (this.param.product === null || this.param.product === undefined) return "";
    return this.param.product.product.name + '(' + this.param.product.measure_type.name + ')';
  }//fin getProductSelectedName


}

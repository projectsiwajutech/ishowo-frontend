

import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {StatsService} from "../../../../services/stats/stats.service";
import {GlobalReport} from "../../../../models/stats/globalreport";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {ProductInStock} from "../../../../models/product/productinstock";
import {ProductService} from "../../../../services/product/product.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";

@Component({
  selector: 'it-stats-product-sold',
  templateUrl: './stats.product.sold.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProductSoldStatsComponent implements OnInit, OnChanges{

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
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
  }

  ngOnChanges(): void{
  }//end ngOnChanges

  //show by period stats
  getProductsStats(){
    this.getStatsOnProductQtySoldByPeriod();
    this.getStatsOnProductCaByPeriod();
    this.getStatsOnProductProfitByPeriod();
  }

  //show by period stats
  getStatsOnProductQtySoldByPeriod(): void{
    this.isLoadingStatsQty = true;
    this.reportProdQty = [];
    this.statsService.getProductSoldByQuantityStats(this.param)
      .then(
        result => {
          this.isLoadingStatsQty = false;
          this.reportProdQty = result;
          if(this.reportProdQty === null) this.reportProdQty = [];
        },
        (error: any) => {
          this.reportProdQty = [];
          this.isLoadingStatsQty = false;
        }
      );
  }//fin getStatsOnProductQtySoldByPeriod

  //show by period stats
  getStatsOnProductCaByPeriod(): void{
    this.isLoadingStatsCa = true;
    this.reportProdCa = [];
    this.statsService.getProductSoldByCaStats(this.param)
      .then(
        result => {
          this.isLoadingStatsCa = false;
          this.reportProdCa = result;
          if(this.reportProdCa === null) this.reportProdCa = [];
        },
        (error: any) => {
          this.reportProdCa = [];
          this.isLoadingStatsCa = false;
        }
      );
  }//fin getStatsOnProductCaByPeriod

  //show by period stats
  getStatsOnProductProfitByPeriod(): void{
    this.isLoadingStatsProfit = true;
    this.statsService.getProductSoldByProfitStats(this.param)
      .then(
        result => {
          this.isLoadingStatsProfit = false;
          this.reportProdProfit = result;
          if(this.reportProdProfit === null) this.reportProdProfit = [];
        },
        (error: any) => {
          this.reportProdProfit = [];
          this.isLoadingStatsProfit = false;
        }
      );
  }//fin getStatsOnProductProfitByPeriod

  getSelectedDate1($event: Date){
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date){
    this.param.endDate = $event;
  }

  //can get stats
  canGetStats(): boolean{
    let stateStartDate: boolean = (this.param.product === null || this.param.product === undefined );
    if(stateStartDate === true ){return false;} else { return true; }
  }//fin canGetStats

  //get product name selected
  getProductSelectedName(): string {
    if(this.param === null || this.param === undefined) return "";
    if(this.param.product === null || this.param.product === undefined) return "";
    return this.param.product.product.name + '(' + this.param.product.measure_type.name + ')';
  }//fin getProductSelectedName


}

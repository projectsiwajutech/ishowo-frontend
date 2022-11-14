

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
  selector: 'it-stats-product-global',
  templateUrl: './stats.product.global.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProductGlobalStatsComponent implements OnInit, OnChanges{

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
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getProductTypes();
  }

  ngOnChanges(): void{
  }//end ngOnChanges

  //show by period stats
  getStatsByPeriod(): void{
    this.isLoadingStats = true;
    this.statsService.getProductPeriodGlobalStats(this.param)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if(this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.report = new GlobalReport();
          this.isLoadingStats = false;
        }
      );
  }//fin getStatsByPeriod

  //get product name
  getProductName(obj: ProductInStock){
    if(obj !== null && obj !== undefined){
      if(obj.product !== null && obj.product !== undefined){ return obj.product.product.name; } else{ return ""; }
    }else{ return "";}
  }//fin getProductName

  //get product measure type
  getProductMeasureType(obj: ProductInStock){
    if(obj !== null && obj !== undefined){
      if(obj.product !== null && obj.product !== undefined){  return "(" + obj.product.measure_type.name + ")"; } else{ return ""; }
    }else{ return "";}
  }//fin getProdMeasureType

  //get product quantity or amount
  getProductQA(obj: ProductInStock){
    if(obj !== null && obj !== undefined){  return obj.quantity;  }else{ return 0;}
  }//fin getProdQA

  getSelectedDate1($event: Date){
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date){
    this.param.endDate = $event;
  }

  //get list of products stock view
  getProductTypes(): void {
    this.product_types = []; this.isLoadingStock = true;
    this.productService.getProductTypes(this.user)
      .then(
        product_types => {
          this.product_types = product_types; this.isLoadingStock = false;
        },
        error => {this.isLoadingStock = true;}
      );
  }//fin getProductTypes

  //select product
  selectProd(obj: ProdMeasureType): void{
    this.param.product = obj; this.report = new GlobalReport();
  }//fin selectProd

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

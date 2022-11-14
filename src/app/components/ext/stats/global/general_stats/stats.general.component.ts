

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

@Component({
  selector: 'it-stats-general',
  templateUrl: './stats.general.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class GeneralStatsComponent implements OnInit, OnChanges{

  //report var
  report: GlobalReport = new GlobalReport();
  isLoadingStats: boolean = false;
  param: PeriodParam = new PeriodParam();
  @Input() is_part_visible: boolean = true;
  @Input() title: string = "Statistiques globales";

  //user connected
  user: Profil;

  constructor(
    private statsService: StatsService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getCurrentStats();
  }

  ngOnChanges(): void{
  }//end ngOnChanges

  //create object
  getCurrentStats(): void{
    this.isLoadingStats = true;
    this.statsService.getCurrentStats(this.user)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if(this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getCurrentStats

  //show by period stats
  getStatsByPeriod(): void{
    this.isLoadingStats = true;
    this.statsService.getPeriodGlobalStats(this.param)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if(this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getStatsByPeriod

  //get product name
  getProductName(obj: ProductInStock){
    if(obj !== null && obj !== undefined){
      if(obj.product !== null && obj.product !== undefined){ return obj.product.product.name; } else{ return ""; }
    }else{ return "";}
  }//fin getProdName

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

  getPeriodLib(): string{
    let periodLib : string = "du " + this.param.startDate + " au  " + this.param.endDate;
    return periodLib;
  }//fin getPeriodLib


}

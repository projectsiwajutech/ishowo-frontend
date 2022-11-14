import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { GlobalReport } from 'src/app/shared/models/stats/globalreport';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.scss']
})
export class GeneralStatsComponent implements OnInit {

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();

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
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getCurrentStats();
  }

  //create object
  getCurrentStats(): void {
    this.isLoadingStats = true;
    this.statsService.getCurrentStats(this.user)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if (this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getCurrentStats

  //show by period stats
  getStatsByPeriod(form :any): void {
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.isLoadingStats = true;
    this.statsService.getPeriodGlobalStats(this.param)
      .then(
        result => {
          this.isLoadingStats = false;
          this.report = result;
          if (this.report === null) this.report = new GlobalReport();
        },
        (error: any) => {
          this.isLoadingStats = false;
        }
      );
  }//fin getStatsByPeriod

  //get product name
  getProductName(obj: ProductInStock) {
    if (obj !== null && obj !== undefined) {
      if (obj.product !== null && obj.product !== undefined) { return obj.product.product.name; } else { return ""; }
    } else { return ""; }
  }//fin getProdName

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

  getSelectedDate1($event: Date) {
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date) {
    this.param.endDate = $event;
  }

  getPeriodLib(): string {
    let periodLib: string = "du " + this.param.startDate + " au  " + this.param.endDate;
    return periodLib;
  }//fin getPeriodLib


}

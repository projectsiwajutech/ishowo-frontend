import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDB } from 'src/app/demo/pages/core-chart/crt-apex/chart/chart-data';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { UserReport } from 'src/app/shared/models/stats/userreport';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'app-sellers-sales-stats',
  templateUrl: './sellers-sales-stats.component.html',
  styleUrls: ['./sellers-sales-stats.component.scss']
})
export class SellersSalesStatsComponent implements OnInit {

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();
  public chartDB: any = ChartDB;

  userReports: UserReport[] = [];
  param: PeriodParam = new PeriodParam();

  //CHART DATA
  labels: any[] = [];
  series: any[] = [];
  colors: any[] = [];

  isCreateVisible: boolean = false; totalCA: any;
  isLoading: boolean = false; noData: boolean;
  pageStartIndex: number = 0; Clear: boolean;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;
  @Input() chartConfig: any = {
    chart: {
      height: 320,
      type: 'pie',
    },
    labels: this.labels,
    series: this.series,
    colors: this.colors,
    legend: {
      show: true,
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };;

  constructor(
    private statsService: StatsService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getReports();
  }

  //get list of reports
  getReports(): void {
    this.Clear = false;
    this.isLoading = true; this.userReports = [];
    this.statsService.getSalesBySellersStats(this.param)
      .then(
        reports => {
          this.isLoading = false;
          if (reports.length === 0) { this.noData = true; } else { this.noData = false; }
          this.labels.splice(0);
          this.series.splice(0);
          this.colors.splice(0);
          reports.forEach(element => {
            this.labels.push(element.userName);
            this.series.push(element.pourcentage);
            this.colors.push(this.getColor());
          });
          this.Clear = true;
          this.userReports = reports;
        },
        error => {
          this.isLoading = false;
        }
      );


  }//fin getReports

  //get CA
  getCA() {
    this.totalCA = this.userReports
      .map(p => p.totalSell)
      .reduce((sum, current) => sum + current);
    return this.totalCA;
  }
  //fin get CA

  //getColor
  getColor() { return "#" + Math.random().toString(16).slice(2, 8); };
  //fin getColor

  //On Change Date1
  getSelectedDate1(dateStart: any) {
    let format = new Date(dateStart);
    this.param.startDate = format;
  }// fin 

  //On Change Date2
  getSelectedDate2(dateEnd: any) {
    let format = new Date(dateEnd);
    format.setHours(23, 59, 59, 999);
    this.param.endDate = format;
  }//On Change Date2

}

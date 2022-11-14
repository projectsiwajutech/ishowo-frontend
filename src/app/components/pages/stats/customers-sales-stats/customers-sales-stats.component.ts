import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { UserReport } from 'src/app/shared/models/stats/userreport';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { StatsService } from 'src/app/shared/services/stats/stats.service';

@Component({
  selector: 'app-customers-sales-stats',
  templateUrl: './customers-sales-stats.component.html',
  styleUrls: ['./customers-sales-stats.component.scss']
})
export class CustomersSalesStatsComponent implements OnInit {

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();

  userReports: UserReport[] = [];
  param: PeriodParam = new PeriodParam();

  isCreateVisible: boolean = false; noData: boolean;
  isLoading: boolean = false;
  pageStartIndex: number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private statsService: StatsService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getReports();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of reports
  getReports(): void {
    this.isLoading = true; this.userReports = [];
    this.statsService.getSalesByCustomersStats(this.param)
      .then(
        reports => {
          this.isLoading = false;
          if (reports.length === 0) { this.noData = true; } else { this.noData = false; }
          this.userReports = reports;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getReports

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

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

}

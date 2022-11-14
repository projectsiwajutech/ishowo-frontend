/**
 * Created by Utilisateur on 26/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';



import {Supplier} from '../../../../models/supplier/supplier';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {User} from "../../../../models/user/user";
import {UserService} from "../../../../services/user/user.service";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {LibraryService} from "../../../../services/app/library.service";
import {UserReport} from "../../../../models/stats/userreport";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {StatsService} from "../../../../services/stats/stats.service";


@Component({
  selector: 'it-customers-sales',
  templateUrl: './stats.customers.sales.component.html',
  // styleUrls: ['./users.component.css'],

})

export class CustomersSalesStatsComponent implements OnInit{

  userReports : UserReport[] = [] ;
  param: PeriodParam = new PeriodParam();

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private statsService: StatsService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getReports();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of reports
  getReports(): void {
    this.isLoading = true;  this.userReports = [];
    this.statsService.getSalesByCustomersStats(this.param)
      .then(
        reports => {
          this.isLoading = false;
          this.userReports = reports;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getReports

  getSelectedDate1($event: Date){
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date){
    this.param.endDate = $event;
  }

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  goBack(): void {
    this.location.back();
  }

}

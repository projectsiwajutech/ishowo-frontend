import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogItem } from 'src/app/shared/models/logitem/logitem';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-agencies',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnChanges {

  @Input() subject: string;

  //form related objects
  page  : number = 1;
  pageSize  : number = 30;
  noData: boolean;
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  items: LogItem[] = [];
  selectedUpObject: LogItem;

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false;
  isOrdersListPdfVisible: boolean = false; generatedOrdersListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex: number = 0; limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    private constantService: ConstantService,
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getItems();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    this.dtOptions = this.constantService.DtOptions;
  }

  ngOnChanges(): void {
  }

  //get list of items
  getItems(): void {
    this.isLoading = true; this.items = [];
    this.userService.getLogs(this.user)
      .then(
        (items: any) => {
          this.isLoading = false;
          if (items.length === 0) { this.noData = true; } else { this.noData = false; }
          this.items = items;
        },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }//fin getItems

  //get list of orders
  searchData(): void {
    this.isLoading = true; this.items = [];
    this.userService.searchLogs(this.param)
      .then(
        (items: any) => {
          this.isLoading = false;
          this.items = items;
        },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //print list of sales
  printData(): void {
    this.isPrinting = true;
    this.userService.searchLogs(this.param)
      .then(
        (pdf: any) => {
          this.isPrinting = false;
          this.isOrdersListPdfVisible = true;
          if (pdf != null) { this.generatedOrdersListPdf = pdf.filename; }
        },
        (error: any) => {
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isOrdersListPdfVisible = event;
  }//fin updateOnPdfClose

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //select for update
  viewDetails(obj: any): void {
    this.selectedUpObject = obj;
    this.visible = false;
  }//fin selectForUpdate

  //hide detail form
  updateOnClosed($event: any): void {
    this.visible = true;
  }

  //get orderer
  getOrderer(obj: Profil): string {
    let result: string = "";
    result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getOrderer

  getSelectedDate1($event: Date) {
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date) {
    this.param.endDate = $event;
  }

  //paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin


}

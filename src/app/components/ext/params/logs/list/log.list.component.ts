import { UserService } from './../../../../services/user/user.service';
import { LogItem } from './../../../../models/logitem/logitem';
/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {LibraryService} from "../../../../services/app/library.service";


@Component({
  selector: 'it-log-list',
  templateUrl: './log.list.component.html',
  //styleUrls: ['./orders.component.css']

})

export class LogListComponent implements OnInit, OnChanges{

  @Input() subject: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  items: LogItem[] = [];
  selectedUpObject: LogItem;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;  isPrinting: boolean = false;
  isOrdersListPdfVisible: boolean = false;  generatedOrdersListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0; limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor (
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getItems();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  ngOnChanges(): void{
  }

  //get list of items
  getItems(): void {
    this.isLoading = true;  this.items = [];
    this.userService.getLogs(this.user)
      .then(
        (items: any) => {
        this.isLoading = false;
        this.items = items;
      },
        (error: any) => {
          this.isLoading = false;
        }
    );
  }//fin getItems

  //get list of orders
  searchData(): void {
    this.isLoading = true;  this.items = [];
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
          if (pdf != null)  { this.generatedOrdersListPdf = pdf.filename; }
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
    result = (obj.user !== null)? (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getOrderer

  //hide the form
  hideForm() : void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //search area

  getSelectedDate1($event: Date){
    this.param.startDate = $event;
  }

  getSelectedDate2($event: Date){
    this.param.endDate = $event;
  }

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin


}

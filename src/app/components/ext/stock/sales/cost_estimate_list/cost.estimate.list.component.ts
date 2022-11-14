/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';
import {SaleService} from "../../../../services/sale/sale.service";
import {Sale} from "../../../../models/sale/sale";
import {User} from "../../../../models/user/user";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {LibraryService} from "../../../../services/app/library.service";


@Component({
  selector: 'it-cost-estimate-list',
  templateUrl: './cost.estimate.list.component.html',
  //styleUrls: ['./orders.component.css']

})

export class CostEstimateListComponent implements OnInit{

  @Input() subject: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  sales: Sale[] = [];
  selectedUpObject: Order;

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false;
  isSalesListPdfVisible: boolean = false;  generatedSalesListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getSales();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of sales
  getSales(): void {
    this.isLoading = true;  this.sales = [];
    this.saleService.getDevis(this.user)
      .then(
        sales => {
          this.isLoading = false;
          this.sales = sales;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getSales

  //get list of sales
  searchData(): void {
    this.isLoading = true;  this.sales = [];
    this.saleService.searchDevis(this.param)
      .then(
        sales => {
          this.isLoading = false;
          this.sales = sales;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //print list of sales
  printData(): void {
    this.isPrinting = true;
    this.saleService.printSales(this.param)
      .then(
        pdf => {
          this.isPrinting = false;
          this.isSalesListPdfVisible = true;
          if(pdf != null)  this.generatedSalesListPdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
        }
      );
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isSalesListPdfVisible = event;
  }//fin updateOnPdfClose


  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //select for update
  viewDetails(obj: Order): void{
    this.selectedUpObject = obj;
    this.visible = false;
  }//fin selectForUpdate

  //hide detail form
  updateOnClosed($event: any): void{
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    let link = ['/app/sales_main'];
    this.router.navigate(link);
  }

  //get customer
  getCustomer(obj: User): string{
    let result: string = "";
    result = (obj !== null && obj !== undefined && obj.lastname !== undefined  && obj.firstname !== undefined)?
      (obj.lastname + " " + obj.firstname) : "";
    return result;
  }//fin getCustomer

  //get seller
  getSeller(obj: Profil): string{
    let result: string = "";
    result = (obj.user !== null && obj.user !== undefined  && obj.user.lastname !== undefined  && obj.user.firstname !== undefined)?
      (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getSeller

  //date de debut
  getSelectedDateStart(event: Date){
    this.param.startDate = event;
  }

  //date de fin
  getSelectedDateEnd(event: Date){
    this.param.endDate = event;
  }

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin


}

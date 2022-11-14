
import {Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router  }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Order} from '../../../../models/order/order';
import {OrderService} from '../../../../services/order/order.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {PeriodParam} from "../../../../models/query/PeriodParam";
import {LibraryService} from "../../../../services/app/library.service";


@Component({
  selector: 'it-order-notcompleted-list',
  templateUrl: './order.notcompleted.list.component.html',
  //styleUrls: ['./orders.component.css']
})

export class OrderNotCompletedListComponent implements OnInit, OnChanges{

  @Input() subject: string;
  @Input() visible: boolean = true;

  //form related objects
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  orders: Order[] = [];
  selectedUpObject: Order;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;  isPrinting: boolean = false;
  isOrdersListPdfVisible: boolean = false;  generatedOrdersListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex : number = 0; limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  private libraryService: LibraryService,
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getOrders();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  ngOnChanges(): void{
  }

  //get list of orders
  getOrders(): void {
    this.isLoading = true;  this.orders = [];
    this.orderService.getOrdersNotCompleted(this.user)
      .then(
        orders => {
        this.isLoading = false;
        this.orders = orders;
        if(this.orders === null) this.orders = [];
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getOrders

  //get list of orders
  searchData(): void {

  }//fin searchData

  //print list of sales
  printData(): void {
  
  }//fin printData

  //update on close
  updateOnPdfClose(event: any): void {
    this.isOrdersListPdfVisible = event;
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

  //get orderer
  getOrderer(obj: Profil): string{
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

   //get total orders value
  getTotalOrdersValue(items: Order[]): number{
    if(items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.amount)
      .reduce((sum, current) => sum + current);
      return total;
  }//fin getTotalOrdersValue

    //creer une commande
  createCommand(): void{
    let link = ['/app/orders_create'];
    this.router.navigate(link);
  }//fin createCommand


}

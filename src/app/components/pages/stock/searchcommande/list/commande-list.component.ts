import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order/order';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeDetailsComponent } from '../details/commande-details.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit, OnChanges {

  @Input() subject: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = ""; noData: boolean;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  orders: Order[] = [];
  selectedUpObject: Order;
  dtColumnsReorderOptions: any = {};

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false;
  isOrdersListPdfVisible: boolean = false; generatedOrdersListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex: number = 0; limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;
  page  : number = 1;
  pageSize  : number = 30;
  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getOrders();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  ngOnChanges(): void {
  }

  //get list of orders
  getOrders(): void {
    this.isLoading = true; this.orders = [];
    this.orderService.getOrders(this.user)
      .then(
        orders => {
          this.isLoading = false;
          if (orders.length === 0) { this.noData = true; } else { this.noData = false; }
          this.orders = orders;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getOrders

  //get list of orders
  searchData(form: any): void {
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.isLoading = true; this.orders = [];
    this.orderService.searchOrders(this.param)
      .then(
        orders => {
          this.isLoading = false;
          if (orders.length === 0) { this.noData = true; } else { this.noData = false; }
          this.orders = orders;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchData

  //print list of sales
  printData(): void {
    this.ngxService.start();
    this.isPrinting = true;
    this.orderService.printOrders(this.param)
      .then(
        pdf => {
          this.isPrinting = false;

          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_LISTE_COMMANDES.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.ngxService.stop();
          window.open(url, '_blank');

          // this.isOrdersListPdfVisible = true;
          // if(pdf != null)  this.generatedOrdersListPdf = pdf.filename;
        },
        error => {
          this.isPrinting = false;
          this.ngxService.stop();
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
  viewDetails(obj: Order): void {
    this.selectedUpObject = obj;
    this.visible = false;
    const modalRef = this.modalService.open(CommandeDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
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

  //hide the form
  hideForm(): void {
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //search area

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

  //get total orders value
  getTotalOrdersValue(items: Order[]): number {
    if (items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.amount)
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getTotalOrdersValue

  //creer une commande
  createCommand(): void {
    let link = ['/app/orders_create'];
    this.router.navigate(link);
  }//fin createCommand

}

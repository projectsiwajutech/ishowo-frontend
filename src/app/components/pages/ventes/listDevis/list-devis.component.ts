import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order/order';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { Sale } from 'src/app/shared/models/sale/sale';
import { User } from 'src/app/shared/models/user/user';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {

  @Input() subject: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();
  pageSize  : number = 30;
  page  : number = 1;

  sales: Sale[] = [];
  selectedUpObject: Order;

  isCreateVisible: boolean = false;
  isLoading: boolean = false; isPrinting: boolean = false; noData: boolean;
  isSalesListPdfVisible: boolean = false; generatedSalesListPdf: string = "";

  param: PeriodParam = new PeriodParam();
  pageStartIndex: number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getDevis();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of devis
  getDevis(): void {
    this.isLoading = true; this.sales = [];
    this.saleService.getDevis(this.user)
      .then(
        sales => {
          this.isLoading = false;
          if (sales.length === 0) { this.noData = true; } else { this.noData = false; }
          this.sales = sales.filter(x => x.is_balanced === false);
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getDevis

  //get list of sales
  searchData(form: any): void {
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.isLoading = true; this.sales = [];
    this.saleService.searchDevis(this.param)
      .then(
        sales => {
          this.isLoading = false;
          if (sales.length === 0) { this.noData = true; } else { this.noData = false; }
          this.sales = sales.filter(x => x.is_balanced === false);
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
          if (pdf != null) this.generatedSalesListPdf = pdf.filename;
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
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //select for update
  viewDetails(obj: Order): void {
    this.selectedUpObject = obj;
    this.visible = false;
  }//fin selectForUpdate

  //hide detail form
  updateOnClosed($event: any): void {
    this.visible = true;
  }

  //hide the form
  hideForm(): void {
    let link = ['/app/sales_main'];
    this.router.navigate(link);
  }

  //get customer
  getCustomer(obj: any): string {
    let result: string = "";
    if ((obj !== null) && (obj !== undefined) && (obj.nom !== null) && (obj.prenom !== null)) {
      result = obj.nom + " " + obj.prenom + " (" + obj.telephone + ")";
    } else if ((obj !== null) && (obj !== undefined) && (obj.social_reason !== null)) {
      result = obj.social_reason + " (" + obj.telephone + ")";
    }
    else {
      result = "ANONYME";
    }
    return result;
  }//fin getCustomer

  //get seller
  getSeller(obj: Profil): string {
    let result: string = "";
    result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
      (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getSeller

  //date de debut
  getSelectedDateStart(event: Date) {
    this.param.startDate = event;
  }

  //date de fin
  getSelectedDateEnd(event: Date) {
    this.param.endDate = event;
  }

  //paginate on page change
  paginate(event: any): void {
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin


}

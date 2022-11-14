import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { PeriodParam } from 'src/app/shared/models/query/PeriodParam';
import { Sale } from 'src/app/shared/models/sale/sale';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import * as FileSaver from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleDetailsComponent } from '../details/sale-details.component';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrls: ['./list-sales.component.scss']
})
export class ListSalesComponent implements OnInit {

  @Input() subject: string;

  //form related objects
  visible: boolean = true;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  sales: Sale[] = [];
  selectedUpObject: Sale;
  DefaultDateOne = new Date();
  DefaultDateTwo = new Date();
  page: number = 1;
  pageSize: number = 30;

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
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private libraryService: LibraryService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.param.agent = this.user;
    this.getSales();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of sales
  getSales(): void {
    this.isLoading = true; this.sales = [];
    this.saleService.getSales(this.user)
      .then(
        sales => {
          this.isLoading = false;
          if (sales.length === 0) { this.noData = true; } else { this.noData = false; }
          this.sales = sales;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getSales

  //get list of sales
  searchData(form: any): void {
    this.param.startDate = form.dateStart;
    this.param.endDate = form.dateEnd;
    this.isLoading = true; this.sales = [];
    this.saleService.searchSales(this.param)
      .then(
        sales => {
          this.isLoading = false;
          if (sales.length === 0) { this.noData = true; } else { this.noData = false; }
          this.sales = sales;
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
    this.param.startDate = this.DefaultDateOne;
    this.param.endDate = this.DefaultDateTwo;
    this.saleService.printSales(this.param)
      .then(
        pdf => {
          this.isPrinting = false;
          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_LISTE_VENTES.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob); window.open(url, '_blank');
          this.ngxService.stop();
        },
        error => {
          this.ngxService.stop();
          this.isPrinting = false;
          alert("Une erreur est survenue");
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
  viewDetails(obj: Sale): void {
    this.selectedUpObject = obj;
    this.visible = false;
    const modalRef = this.modalService.open(SaleDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.item = obj;
  }//fin selectForUpdate

  //select for update
  CancelSale(obj: Sale): void {
    this.ngxService.start();
    this.saleService.cancelSale(obj)
      .then(
        result => {
          this.ngxService.stop();
          let fileBlob = result.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_FACTURE_AVOIR.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob);
          this.libraryService.onSuccess("La facture a été Annulée",2500, 'top-end');
          this.getSales();
          window.open(url, '_blank');
        },
       error => {
          this.ngxService.stop();
          this.getSales();
          this.libraryService.onError("Echec de l'annulation", 3000, 'top'); return;
        }
      );
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

  //get total sales value
  getTotalSalesValue(items: Sale[]): number {
    if (items.length === 0) return 0;
    let total: number = 0;
    total = items
      .map(p => p.amount_to_pay)
      .reduce((sum, current) => sum + current);
    return total;
  }//fin getTotalSalesValue

  //creer une vente
  createSale(): void {
    let link = ['/app/sales_create'];
    this.router.navigate(link);
  }//fin createSale

  //confirmInvoiceDeleteModal
  async confirmProdRemoveModal(item: Sale) {
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
      text: `Êtes-vous sûre d'annuler cette vente ?`,
      icon: 'warning',
      imageHeight: 100,
      imageWidth: 100,
      showCancelButton: true,
      cancelButtonText: `Annuler`,
      confirmButtonText: `Oui, Je Confirme`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.CancelSale(item);
      }
    });
  }//fin confirmInvoiceDeleteModal

}

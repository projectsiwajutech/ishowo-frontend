import { LibraryService } from './../../../../shared/services/app/library.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Sale } from 'src/app/shared/models/sale/sale';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { SaleDetailsComponent } from '../listSale/details/sale-details.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-main-sales',
  templateUrl: './main-sales.component.html',
  styleUrls: ['./main-sales.component.scss']
})
export class MainSalesComponent implements OnInit {

  isLoading: boolean;
  noData: boolean;
  user: Profil;
  sales: Sale[] = [];
  page: number = 1;
  pageSize: number = 30;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private modalService: NgbModal,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getSales();
  }

  goOne() {
    this.router.navigate(['/ventes/createsale']);
  }
  goTwo() {
    this.router.navigate(['/ventes/partialsale']);
  }
  goThree() {
    this.router.navigate(['/ventes/listsales']);
  }
  goFour() {
    this.router.navigate(['/ventes/listdevis']);
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
  getSeller(obj: any): string {
    let result: string = "";
    result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
      (obj.user.lastname + " " + obj.user.firstname) : "";
    return result;
  }//fin getSeller

   //select for update
   viewDetails(obj: Sale): void {
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

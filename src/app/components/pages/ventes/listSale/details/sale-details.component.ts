import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import * as FileSaver from 'file-saver';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from 'src/app/shared/services/sale/sale.service';
import { Sale } from 'src/app/shared/models/sale/sale';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent implements OnInit {

  @Input() item: Sale;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  show: boolean = false;
  isPrinting: boolean = false;
  isVentePdfVisible: boolean = false; generatedVentePdf: string = "";
  amountToPay: number = 0;

  //user connected
  user: Profil;

  //form related objects
  isBalancing: boolean = false;

  constructor(
    private saleService: SaleService,
    private locStorService: LocalStorageService,
    private ngxService: NgxUiLoaderService,
    private libraryService: LibraryService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
    this.amountToPay = this.item.amount_to_pay - this.item.amount_paid;
  }

  ngOnChanges(): void {
    // if(this.item.customer === null || this.item.customer === undefined){this.item.customer = new User(); }
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

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //hide the form
  hideForm(): void {
    this.closed.emit("closed");
  }

  //print order
  printData(): void {
    this.ngxService.start();
    this.isPrinting = true;
    this.saleService.printSale(this.item)
      .then(
        pdf => {
          this.ngxService.stop();
          this.isPrinting = false;

          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          let filename = 'ISHOWO_DETAIL_VENTE.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob); window.open(url, '_blank');

          // this.isVentePdfVisible = true;
          // if(pdf != null)  this.generatedVentePdf = pdf.filename;
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
    this.isVentePdfVisible = false;
  }//fin updateOnPdfClose

  //solder
  payBalance(): void {
    this.show = true;
    this.isBalancing = true;
    this.item.amount_paid = parseInt(new String(this.amountToPay).toString()) + parseInt(new String(this.item.amount_paid).toString());
    this.item.rest_to_pay = this.item.amount_to_pay - this.item.amount_paid;
    this.item.remainder = this.item.amount_paid - this.item.amount_to_pay;
    this.saleService.payBalance(this.item)
      .then(
        result => {
          this.amountToPay = 0;
          this.isBalancing = false;
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isBalancing = false;
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin payBalance

  //can show balance button
  canShowBalanceBtn(): boolean {
    if (this.item === null || this.item === undefined) { return false; }
    if (this.item.amount_paid >= this.item.amount_to_pay) { return false; } else { return true; }
  }//fin canShowBalanceBtn

  //Fermeture
  close() {
    this.activeModal.close();
  }//end close
  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Mis à jour de Vente réussie!',
      showConfirmButton: false,
      icon: "success",
      timer: 1100,
      timerProgressBar: true,
    })
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  //Echec de l'enregistrement
  errorSwal() {
    Swal.fire('Echec de l\'Enregistrement de le mise à jour', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }
}

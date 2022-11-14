import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order/order';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import * as FileSaver from 'file-saver';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss']
})
export class CommandeDetailsComponent implements OnInit {

  @Input() item: Order;
  @Input() subject: string;
  @Output() closed = new EventEmitter<string>(); //used to update the list when action completed here
  isPrinting: boolean = false;
  show: boolean = false;
  isOrderPdfVisible: boolean = false; generatedOrderPdf: string = "";
  amountToPay: number = 0;
  //form related objects
  isBalancing: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private ngxService: NgxUiLoaderService,
    public activeModal: NgbActiveModal,
    public libraryService: LibraryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item.agent = this.user;
    this.amountToPay = this.item.amount - this.item.amount_paid;
  }

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
    this.orderService.printOrder(this.item)
      .then(
        pdf => {
          this.isPrinting = false;
          let fileBlob = pdf.blob(); let blob = new Blob([fileBlob], { type: 'application/pdf' });
          this.ngxService.stop();
          let filename = 'ISHOWO_DETAIL_COMMANDE.pdf'; FileSaver.saveAs(blob, filename);
          var url = URL.createObjectURL(blob); window.open(url, '_blank')

          // this.isOrderPdfVisible = true;
          // if(pdf != null)  this.generatedOrderPdf = filename; // pdf.filename;
        },
        error => {
          this.ngxService.stop();
          this.isPrinting = false;
          alert("Une erreur est survenue");
        }
      );
  }//fin printData

  //solder
  payBalance(): void {
    this.ngxService.start();
    this.show = true;
    this.isBalancing = true;
    this.item.amount_paid = parseInt(new String(this.amountToPay).toString()) + parseInt(new String(this.item.amount_paid).toString());
    this.orderService.payBalance(this.item)
      .then(
        result => {
          this.ngxService.stop();
          this.amountToPay = 0;
          this.isBalancing = false;
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.ngxService.stop();
          this.show = false;
          this.isBalancing = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin payBalance

  //can show balance button
  canShowBalanceBtn(): boolean {
    if (this.item === null || this.item === undefined) { return false; }
    if (this.item.amount_paid >= this.item.amount) { return false; } else { return true; }
  }//fin canShowBalanceBtn

  //update on close
  updateOnPdfClose(event: any): void {
    this.isOrderPdfVisible = false;
  }//fin updateOnPdfClose

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

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-product-stock-view',
  templateUrl: './product-stock-view.component.html',
  styleUrls: ['./product-stock-view.component.scss']
})
export class ProductStockViewComponent implements OnInit {

  @Input() item: ProductInStock;
  @Input() subject: string;
  @Output() hidden = new EventEmitter<string>(); //used to update the list when action completed here

  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  quantity: number = 0;

  //user connected
  user: Profil;

  constructor(
    private productService: ProductService,
    private locStorService: LocalStorageService,
    private activeModal: NgbActiveModal,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
  }

  //create object
  save(): void {
    this.ngxService.start;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.quantity = this.quantity;
    this.productService.expandStockView(this.item, this.user)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.ngxService.stop;
          this.statusMessage = "Stock modifié avec succès";
          // /this.item = result;
          this.item = new ProductInStock();
          this.quantity = 0;
          this.hidden.emit("hidden");
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.ngxService.stop;
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin save

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //can expand stock
  canExpandStock(): boolean {
    let stateQuantity: boolean = (this.quantity === null || this.quantity === undefined || this.quantity.toString() === "" || this.quantity === 0
      || this.quantity > this.item.quantity);

    if (stateQuantity === true) { return false; } else { return true; }
  }//fin canExpandStock



  //Fermeture
  close() {
    this.activeModal.close();
  }//end close

  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Stock modifié avec succès!',
      showConfirmButton: false,
      icon: "success",
      timer: 1200,
      timerProgressBar: true,
    })
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  //Echec de l'enregistrement
  errorSwal() {
    Swal.fire('Echec de l\'Enregistrement du Transfert', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }
}

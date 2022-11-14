import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Product } from 'src/app/shared/models/product/product';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { StockTransfer } from 'src/app/shared/models/stocktransfer/stocktransfer';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StockTransferService } from 'src/app/shared/services/stocktransfer/stocktransfer.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-tran-stocks-create',
  templateUrl: './tran-stocks-create.component.html',
  styleUrls: ['./tran-stocks-create.component.scss']
})
export class TranStocksCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  @Output() visibility_change = new EventEmitter<boolean>();

  item: StockTransfer;
  products: Product[]; allProducts: Product[];
  show: boolean = false;
  compartments: Compartment[];
  stock_view: ProductInStock[] = [];
  current_stock_view: ProductInStock[] = [];
  isLoadingStock: boolean = false;

  visible: boolean = false; noData: boolean; page: number = 1; pageSize: number = 30;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private stockTransferService: StockTransferService,
    private productService: ProductService,
    private compartmentService: CompartmentService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item = new StockTransfer();
    this.getStockView(); this.getCompartments();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.item = new StockTransfer(); this.isLoadingStock = false;
    this.getStockView(); this.getCompartments();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.item.product_lines = this.current_stock_view;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.item.product_lines.forEach(element => {
      element.compartment = this.item.destination;
    });
    this.stockTransferService.createTransfer(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.item = new StockTransfer();
          this.current_stock_view = [];
          this.item = result;
          this.created.emit("created");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin save

  //check qty to transfer
  checkQtyTransfer(obj: ProductInStock): void {
    if (obj.quantity_transfer > obj.quantity || obj.quantity_transfer < 0) {
      obj.quantity_transfer = 0;
    }
  }//fin checkQtyTransfer

  //can save transfer
  canSaveTransfer(): boolean {
    let stateCompartment: boolean = (this.item.source === null || this.item.source === undefined || this.item.destination === null || this.item.destination === undefined || this.item.source.id === this.item.destination.id);
    let stateCurrentStockExist: boolean = (this.current_stock_view === null || this.current_stock_view === undefined ||
      this.current_stock_view.length === 0 || (this.current_stock_view.filter(x => this.libraryService.isValidNumber(x.quantity_transfer) && x.quantity_transfer !== 0).length === 0));
    //let emptyLinesCount : number = this.current_stock_view.filter(x => x.quantity_transfer === 0).length;

    if (stateCompartment === true || stateCurrentStockExist === true) { return false; } else { return true; }
  }//fin canSaveTransfer

  //get compartment selected stock
  getCompStock(): void {
    this.getStockView();
  }//fin getCompStock

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments

  //get list of products stock view
  getStockView(): void {
    this.stock_view = []; this.isLoadingStock = true;
    this.productService.getStockView(this.user)
      .then(
        stock_view => {
          this.isLoadingStock = false;
          if (stock_view.length === 0) { this.noData = true; } else { this.noData = false; }
          this.stock_view = stock_view;
          if (this.item.source !== undefined && this.item.source !== null) {
            this.current_stock_view = this.stock_view.filter(x => x.compartment.id === this.item.source.id);
          }
        },
        error => {
          this.isLoadingStock = false;
        }
      );
  }//fin getStockView

  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Enregistrement du Transfert réussi!',
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
    Swal.fire('Echec de l\'Enregistrement du Transfert', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  //Fermeture
  close() {
    this.created.emit("created");
    this.activeModal.close();
  }//end close



}

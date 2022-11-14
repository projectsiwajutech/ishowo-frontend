import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';
import { SeuilStockCreateComponent } from '../create/seuil-stock-create.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { ProdStockLimit } from 'src/app/shared/models/prodstocklimit';
import { SeuilStockUpdateComponent } from '../update/seuil-stock-update.component';

@Component({
  selector: 'app-seuil-stock-list',
  templateUrl: './seuil-stock-list.component.html',
  styleUrls: ['./seuil-stock-list.component.scss']
})
export class SeuilStockListComponent implements OnInit {

  stockLimit: ProdStockLimit[] = []; page: number = 1; pageSize: number = 30;
  measureTypes: MeasureType[];

  isCreateVisible: boolean = false;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  isLoading: boolean = false; noData: boolean;

  //filter variables
  param: ProductParam = new ProductParam();

  //user connected
  user: Profil;

  constructor(
    private stockLimitService: StockLimitService,
    private modalService: NgbModal,
    private measureTypeService: MeasureTypeService,
    private ngxService: NgxUiLoaderService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getStockLimit();
    this.getMeasureTypes();
  }

  //get list of stock limit
  getStockLimit(): void {
    this.isLoading = true; this.stockLimit = [];
    this.stockLimitService.getStockLimit(this.user)
      .then(
        stockLimit => {
          this.isLoading = false;
          if (stockLimit.length === 0) { this.noData = true; } else { this.noData = false; }
          this.stockLimit = stockLimit;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getStockLimit

  //get list of measure types
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measureTypes => {
          let emptyObj: MeasureType = new MeasureType(); emptyObj.id = 0; emptyObj.name = "Tous";
          this.measureTypes.push(emptyObj);
          measureTypes.filter(obj => this.measureTypes.push(obj));
        },
        error => {
        }
      );
  }//fin getMeasureTypes

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(SeuilStockCreateComponent, { size: 'xl' });
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de mis à jour
  updateModal(stockLimit : ProdStockLimit) {
    const modalRef = this.modalService.open(SeuilStockUpdateComponent, { size: 'xl' });
    modalRef.componentInstance.item = stockLimit;
  }// end updateModal

  //create object
  deleteStoklimit(obj: any) {
    this.ngxService.start();
    this.isDeleting = true; this.isCompleted = false;
    this.stockLimitService.deleteStockLimit(obj.id)
      .then(
        result => {
          this.ngxService.stop();
          this.getStockLimit();
          this.libraryService.onSuccess("Suppression réussie", 1200, 'top-end');
        },
        error => {
          this.ngxService.stop();
          this.libraryService.onError('Une erreur est survenue au cours de la suppression', 1500, 'top'); return;
        }
      );
  }

  //confirmInvoiceDeleteModal
  async confirmProdRemoveModal(item: ProdStockLimit) {
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
      text: `Confirmez-vous la suppression du seuil de stock du produit: ${item.product.name} | Type de mesure ${item.produit_measure_type.measure_type.name} ?`,
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
        this.deleteStoklimit(item);
      }
    });
  }//fin confirmInvoiceDeleteModal
}

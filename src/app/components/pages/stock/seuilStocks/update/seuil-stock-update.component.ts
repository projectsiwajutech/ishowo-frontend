import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/models/category/category';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProdStockLimit } from 'src/app/shared/models/prodstocklimit';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Product } from 'src/app/shared/models/product/product';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';

@Component({
  selector: 'app-seuil-stock-update',
  templateUrl: './seuil-stock-update.component.html',
  styleUrls: ['./seuil-stock-update.component.scss']
})
export class SeuilStockUpdateComponent implements OnInit {

  @Input() subject: string;
  item: ProdStockLimit;
  products: Product[]; allProducts: Product[];
  measureTypes: MeasureType[];
  selectedCategory: Category;
  categories: Category[];

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;
  constructor(
    private stockLimitService: StockLimitService,
    private locStorService: LocalStorageService,
    private activeModal: NgbActiveModal,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
  }

  //update list of products on cat select
  updateProdOnCat(): void {
    this.products = this.allProducts.filter(x => x.category.id === this.selectedCategory.id);
    this.updateMeasTypOnProd();
  }//fin updateMeasTypOnProd

  //update list of measure types on product select
  updateMeasTypOnProd(): void {
    this.measureTypes = [];
    this.item.product.measure_types.filter(x => this.measureTypes.push(x.measure_type));
    var champ = document.getElementById("mestyp");
    champ.focus();
  }//fin updateMeasTypOnProd

  //update list of measure types on product select
  updateQuantityOnTypeMes(): void {
    var champ = document.getElementById("quant");
    champ.focus();
  }//fin updateMeasTypOnProd

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.stockLimitService.updateStockLimit(this.item)
      .then(
        result => {
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        }
      );
  }

    //Enregistrement réussie
    successSwal() {
      Swal.fire({
        customClass: { container: 'myCustomSwal' },
        title: 'Enregistrement réussi!',
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
      Swal.fire('Echec de l\'Enregistrement', '', 'error');
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

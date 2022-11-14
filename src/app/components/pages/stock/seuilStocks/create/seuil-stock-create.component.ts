import { MeasureTypeService } from './../../../../../shared/services/measuretype/measuretype.service';
import { ProdStockLimit } from './../../../../../shared/models/prodstocklimit';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category/category';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { Product } from 'src/app/shared/models/product/product';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seuil-stock-create',
  templateUrl: './seuil-stock-create.component.html',
  styleUrls: ['./seuil-stock-create.component.scss']
})
export class SeuilStockCreateComponent implements OnInit {

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
    private productService: ProductService,
    private categoryService: CategoryService,
    private stockLimitService: StockLimitService,
    private locStorService: LocalStorageService,
    private activeModal: NgbActiveModal,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.item = new ProdStockLimit();
    this.user = this.locStorService.getUser();
    this.getProducts(); this.getCategories();
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
    this.stockLimitService.createStockLimit(this.item)
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

  //get list of products
  getProducts(): void {
    this.products = [];
    this.productService.getProducts(this.user)
      .then(
        products => {
          this.allProducts = products;
          this.products = products;
        },
        error => {
        }
      );
  }//fin getProducts

  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          this.categories = categories;
        },
        error => {
        }
      );
  }//fin getCategories

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

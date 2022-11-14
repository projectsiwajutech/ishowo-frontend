import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { Product } from 'src/app/shared/models/product/product';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Category } from 'src/app/shared/models/category/category';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  item: Product;
  categories: Category[];
  measureTypes: MeasureType[];

  //selected objects
  selectedMeasureType: MeasureType;

  //form related objects
  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = ""; areMeasureTypeAssociationsValid: boolean = false;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private categoryService: CategoryService,
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
  ) { }



  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new Product();
    this.getCategories();
    this.getMeasureTypes();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.item = new Product();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.item.reference = "";
    this.item.agent = this.user;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";

    this.productService.createProduct(this.item)
      .then(
        result => {
          this.show = true;
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Product();
          this.created.emit("created");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }

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

  //get list of measuretypes
  getMeasureTypes(): void {
    this.measureTypes = [];
    this.measureTypeService.getMeasureTypes(this.user)
      .then(
        measuretypes => {
          this.measureTypes = measuretypes;
        },
        error => {
        }
      );
  }//fin getMeasureTypes

  //can save product
  canSaveProd(): boolean {
    let stateProductName: boolean = (this.item.name === null || this.item.name === undefined || this.item.name === "");
    let stateProductReference: boolean = (this.item.reference !== undefined && this.item.reference !== null && this.item.reference.length < 13);
    let stateProductCategory: boolean = (this.item.category === null || this.item.category === undefined);
    let stateMeasureType: boolean = (this.item.measure_types === undefined || this.item.measure_types.length === 0);
    let stateMeasureTypeAssociationsValid: boolean = (this.item.measure_associations !== undefined && this.item.measure_associations.length !== 0 && this.areMeasureTypeAssociationsValid === false);

    if (stateProductName === true || stateProductCategory === true || stateMeasureType === true
      || stateProductReference === true
      || stateMeasureTypeAssociationsValid === true) { return false; } else { return true; }
  }//fin canAddProd

  //on list change event
  onListChanged(event: any): void {
    this.item.measure_associations = event;
  }//fin onListChanged

  //on list validity check event
  onListChecked(event: any): void {
    this.areMeasureTypeAssociationsValid = event;
  }//fin onListChecked

  //on measure types list change
  onMeasureTypeListChanged(event: any): void {
    this.item.measure_types = event;
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

  onLoadFocus() {
    document.getElementById("product_name").focus();
  }
}

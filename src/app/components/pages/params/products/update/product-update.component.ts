import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/models/category/category';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { Product } from 'src/app/shared/models/product/product';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnChanges{

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Product ;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";  areMeasureTypeAssociationsValid: boolean = false;
  categories: Category[] = [];
  measureTypes: MeasureType[] = [];

  //selected objects
  selectedMeasureType: MeasureType;

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private categoryService: CategoryService,
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
  ) {}


  ngOnInit(): void{
    this. onLoadFocus();
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.getCategories();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.categories.length !==0){this.selectCategory();} else { this.getCategories(); }
    if(this.measureTypes.length !==0){} else { this.getMeasureTypes(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.show=true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.reference = this.item.reference + "" ;
    this.productService.updateProduct(this.item)
      .then(
        result => {
    this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.item = null;
          this.updated.emit("updated");
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
  }//fin save

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select a product
  selectCategory(): void{
    if(this.categories === null || this.categories === undefined) return;
    if(this.categories.length !== 0 ){
      if(this.item === null || this.item === undefined) this.item = new Product();

      this.item.category = this.categories.filter( category => category.id === this.item.category.id)[0];
    }
  }//fin selectCategory

  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          this.categories = categories;
          this.selectCategory();
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
  canSaveProd(): boolean{
    let stateProductName: boolean = (this.item.name === null || this.item.name === undefined  || this.item.name === "" );
    let stateProductCategory: boolean = (this.item.category === null || this.item.category === undefined  );
    let stateMeasureType: boolean = (this.item.measure_types === undefined || this.item.measure_types.length === 0 );
    //let stateMeasureTypeAssociations: boolean = (this.item.measure_associations === undefined || this.item.measure_associations.length === 0 );
    let stateMeasureTypeAssociationsValid: boolean = (this.item.measure_associations !== undefined && this.item.measure_associations.length !== 0 && this.areMeasureTypeAssociationsValid === false );

    if(stateProductName === true || stateProductCategory === true || stateMeasureType === true
      || stateMeasureTypeAssociationsValid === true){return false;} else { return true; }

 }//fin canAddProd

  //on list change event
  onListChanged(event: any): void{
    this.item.measure_associations = event;
  }//fin onListChanged

  //on list validity check event
  onListChecked(event: any): void{
    this.areMeasureTypeAssociationsValid = event;
  }//fin onListChecked

  //on measure types list change
  onMeasureTypeListChanged(event: any): void{
    this.item.measure_types = event;
  }


     //Enregistrement réussie
     successSwal() {
      Swal.fire({
        customClass: { container: 'myCustomSwal'},
        title: 'Enregistrement réussi!',
        showConfirmButton: false,
        icon : "success",
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
    this.updated.emit("updated");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("product_name").focus();
   }


}

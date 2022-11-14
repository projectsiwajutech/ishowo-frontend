/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Category} from '../../../../models/category/category';
import {CategoryService} from '../../../../services/category/category.service';
import {Product} from '../../../../models/product/product';
import {ProductService} from '../../../../services/product/product.service';

import {MeasureType} from '../../../../models/measuretype/measuretype';
import {MeasureTypeService} from '../../../../services/measuretype/measuretype.service';
import {LibraryService} from '../../../../services/app/library.service';
import {MeasureAssociation} from "../../../../models/measureassociation/measureassociation";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-product-update',
  templateUrl: './product.update.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProductUpdateComponent implements OnInit, OnChanges{

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
    private productService: ProductService,
    private categoryService: CategoryService,
    private measureTypeService: MeasureTypeService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}


  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if(this.categories.length !==0){this.selectCategory();} else { this.getCategories(); }
    if(this.measureTypes.length !==0){} else { this.getMeasureTypes(); }
  }//end ngOnChanges

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.reference = this.item.reference + "" ;
    this.productService.updateProduct(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.updated.emit("updated");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
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


}

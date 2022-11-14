import { HostListener } from '@angular/core';


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
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {Profil} from "../../../../models/profil/profil";
import {KEY_CODE} from "../../../../models/browser/KEY_CODE";

@Component({
  selector: 'it-product-create',
  templateUrl: './product.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class ProductCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Product;
  categories: Category[];
  measureTypes: MeasureType[];

  //selected objects
  selectedMeasureType: MeasureType;

  //form related objects
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = ""; areMeasureTypeAssociationsValid: boolean = false;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

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
    this.item = new Product();
    this.getCategories();
    this.getMeasureTypes();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.item = new Product();
  }//end ngOnChanges

  //create object
  save(form : any){
	//this.item = new Product(); this.item.name = form.name; this.item.category = form.category;
    this.item.reference = this.item.reference + "" ;
    this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.productService.createProduct(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Product();
          this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    //this.added_measure_types = [];
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false; this.item = new Product();
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
  canSaveProd(): boolean{
    let stateProductName: boolean = (this.item.name === null || this.item.name === undefined  || this.item.name === "" );
    let stateProductReference: boolean = (this.item.reference !== undefined && this.item.reference !== null  && this.item.reference.length < 13 );
    let stateProductCategory: boolean = (this.item.category === null || this.item.category === undefined  );
    let stateMeasureType: boolean = (this.item.measure_types === undefined || this.item.measure_types.length === 0 );
    //let stateMeasureTypeAssociations: boolean = (this.item.measure_associations === undefined || this.item.measure_associations.length === 0 );
    let stateMeasureTypeAssociationsValid: boolean = (this.item.measure_associations !== undefined && this.item.measure_associations.length !== 0 && this.areMeasureTypeAssociationsValid === false );

    if(stateProductName === true || stateProductCategory === true || stateMeasureType === true
     || stateProductReference === true
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

      @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ADD) {
      this.showCreationForm();
    }
    if (event.keyCode === KEY_CODE.ESC) {
      this.hideForm();
    }
  }


}

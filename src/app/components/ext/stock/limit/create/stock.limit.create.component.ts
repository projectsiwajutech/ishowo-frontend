

import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Compartment} from '../../../../models/compartment/compartment';
import {StockLimit} from "../../../../models/stocklimit/stocklimit";
import {Product} from "../../../../models/product/product";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {ProductService} from "../../../../services/product/product.service";
import {StockLimitService} from "../../../../services/stocklimit/stocklimit.service";
import {Category} from "../../../../models/category/category";
import {CategoryService} from "../../../../services/category/category.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-stock-limit-create',
  templateUrl: './stock.limit.create.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class StockLimitCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: ProdMeasureType;
  products: Product[]; allProducts: Product[];
  measureTypes: MeasureType[];
  selectedCategory: Category;
  categories: Category[];

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
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.item = new ProdMeasureType();
    this.user = this.locStorService.getUser();
    this.getProducts(); this.getCategories();
  }

  ngOnChanges(): void{
    this.user = this.locStorService.getUser();
    this.item = new ProdMeasureType();  this.selectedCategory = new Category();
  }//end ngOnChanges

  //create object
  save(form : any){
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.stockLimitService.createStockLimit(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new ProdMeasureType();
          this.products = this.allProducts;
          this.created.emit("created");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //update list of products on cat select
  updateProdOnCat(): void{
    this.products = this.allProducts.filter(x => x.category.id === this.selectedCategory.id);
  }//fin updateMeasTypOnProd

  //update list of measure types on product select
  updateMeasTypOnProd(): void{
    this.measureTypes = [];
    this.item.product.measure_types.filter(x => this.measureTypes.push(x.measure_type) );
  }//fin updateMeasTypOnProd

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }//fin showCreationForm

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new ProdMeasureType();
  }//fin hideForm

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


}

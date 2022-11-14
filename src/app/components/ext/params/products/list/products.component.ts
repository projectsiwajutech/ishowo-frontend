/**
 * Created by Utilisateur on 26/03/2017.
 */
/**
 * Created by Utilisateur on 24/03/2017.
 */

import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {Product} from '../../../../models/product/product';
import {ProductService} from '../../../../services/product/product.service';
import {Category} from "../../../../models/category/category";
import {CategoryService} from "../../../../services/category/category.service";
import {ProductParam} from "../../../../models/query/ProductParam";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {LibraryService} from "../../../../services/app/library.service";



@Component({
  selector: 'it-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']

})

export class ProductComponent implements OnInit{

  products : Product[] = [] ;
  selectedUpObject: Product;
  selectedDelObject: Product;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //filter variables
  categories: Category[];
  param: ProductParam = new ProductParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getCategories();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

   //search list of products stock view
   searchProducts(): void {
    this.isLoading = true;  this.products = [];
    let prodObj: any = { product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };

    this.productService.searchProducts(this.user, prodObj)
      .then(
        products => {
          this.isLoading = false;
          this.products = products;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchProducts

  //get list of products
  getProducts(): void {
    // this.isLoading = true;  this.products = [];
    // this.productService.getProducts(this.user)
    //   .then(
    //     products => {
    //     this.isLoading = false;
    //     this.products = products;
    //   },
    //     error => {
    //       this.isLoading = false;
    //     }
    // );
  }//fin getProducts

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.searchProducts();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.searchProducts();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.searchProducts();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Product): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Product): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate

  //get list of categories
  getCategories(): void {
    this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          let emptyObj : Category =  new Category(); emptyObj.id = 0; emptyObj.name = "Toutes";
          this.categories.push(emptyObj);
          categories.filter(obj => this.categories.push(obj));
        },
        error => {
        }
      );
  }//fin getCategories

  //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  goBack(): void {
    this.location.back();
  }

}

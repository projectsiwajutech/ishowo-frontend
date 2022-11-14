import { LibraryService } from './../../../../services/app/library.service';
import { ProductParam } from './../../../../models/query/ProductParam';
import { HostListener } from '@angular/core';
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

import {Category} from '../../../../models/category/category';
import {CategoryService} from '../../../../services/category/category.service';
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";

@Component({
  selector: 'it-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']

})

export class CategoryComponent implements OnInit{

  categories : Category[] = [] ;
  selectedUpObject: Category;
  selectedDelObject: Category;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  param: ProductParam = new ProductParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  user: Profil;

  constructor(
    private categoryService: CategoryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location, private libraryService: LibraryService
  ) {}

  ngOnInit(): void{
    this.user = this.locStorService.getUser();
    this.getCategories();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of categories
  getCategories(): void {
    this.isLoading = true;  this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
        this.isLoading = false;
        this.categories = categories;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getCategories

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

  //update list on creation
  updateOnCreate(event: any) : void {
    this.getCategories();
  }//fin updateOnCreate

  //update list on update
  updateOnUpdate(event: any) : void {
    this.getCategories();
  }//fin updateOnUpdate

  //update list on delete
  updateOnDelete(event: any) : void {
    this.getCategories();
  }//fin updateOnDelete


  //select for update
  selectForUpdate(obj: Category): void{
      this.selectedUpObject = obj;
  }//fin selectForUpdate

  //select for delete
  selectForDelete(obj: Category): void{
    this.selectedDelObject = obj;
  }//fin selectForUpdate

    //paginate on page change
  paginate(event: any): void{
    this.pageStartIndex = event.first;
    this.pageLimit = event.rows;
  }//fin

  goBack(): void {
    this.location.back();
  }



}

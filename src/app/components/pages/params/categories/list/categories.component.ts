import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/models/category/category';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { CategoryUpdateComponent } from '../update/category-update.component';
import { CategoryCreateComponent } from '../create/category-create.component';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { CategoryDeleteComponent } from '../delete/category-delete.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  selectedUpObject: Category;
  selectedDelObject: Category;
  page  : number = 1;
  pageSize  : number = 30;
  noData: boolean;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  param: ProductParam = new ProductParam();
  pageStartIndex: number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    private modalService: NgbModal,
    private constantService: ConstantService,
    private categoryService: CategoryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private location: Location, private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.dtOptions = this.constantService.DtOptions;
    this.user = this.locStorService.getUser();
    this.getCategories();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

  //get list of categories
  getCategories(): void {
    this.isLoading = true; this.categories = [];
    this.categoryService.getCategories(this.user)
      .then(
        categories => {
          this.isLoading = false;
          if (categories.length === 0) { this.noData = true; } else { this.noData = false; }
          this.categories = categories;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getCategories

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //modal d'ajout
  createModal() {
    const modalRef = this.modalService.open(CategoryCreateComponent);
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  //modal de suppression
  deleteModal(category: any) {
    const modalRef = this.modalService.open(CategoryDeleteComponent);
    modalRef.componentInstance.item = category;
  }// end createModal

  //modal de mis-à-jour
  updateModal(category: any) {
    const modalRef = this.modalService.open(CategoryUpdateComponent);
    modalRef.componentInstance.item = category;
  }//fin updateModal


}

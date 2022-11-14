import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/models/category/category';
import { Product } from 'src/app/shared/models/product/product';
import { Profil } from 'src/app/shared/models/profil/profil';
import { ProductParam } from 'src/app/shared/models/query/ProductParam';
import { ConstantService } from 'src/app/shared/services/app/constant.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ProductCreateComponent } from '../create/product-create.component';
import { ProductDeleteComponent } from '../delete/product-delete.component';
import { ProductUpdateComponent } from '../update/product-update.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products : Product[] = [] ;
  selectedUpObject: Product;
  selectedDelObject: Product;
  page  : number = 1;
  pageSize= 30;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean;

  //filter variables
  categories: Category[];
  param: ProductParam = new ProductParam();
  pageStartIndex : number = 0;
  limitTable: number[] = []; pageLimit: number = 0;

  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    private modalService: NgbModal,
    private constantService: ConstantService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void{
    this.dtOptions = this.constantService.DtOptions;
    this.user = this.locStorService.getUser();
    this.getCategories();
    this.getProducts();
    this.limitTable = this.libraryService.getPaginatorLimitList(); this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
  }

   //search list of products stock view
   searchProducts(): void {
    this.isLoading = true;  this.products = [];
    let prodObj: any = {product_categ: this.param.category,product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };

    this.productService.searchProducts(this.user, prodObj)
      .then(
        products => {
          this.isLoading = false;
          if (products.length === 0) { this.noData = true; } else { this.noData = false; }
          this.products = products;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin searchProducts

  //get list of products
  getProducts(): void {
    this.isLoading = true;  this.products = [];
    this.productService.getProducts(this.user)
      .then(
        products => {
        this.isLoading = false;
          if (products.length === 0) { this.noData = true; } else { this.noData = false; }
          this.products = products;
      },
        error => {
          this.isLoading = false;
        }
    );
  }//fin getProducts

  //track by
  trackByFn(index: number, item: any): any{
    return item.id;
  }//fin trackByFn

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

   //modal d'ajout
   createModal() {
    const modalRef = this.modalService.open(ProductCreateComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.created.subscribe((receivedEntry) => {
    })
  }// end createModal

  deleteModal(product: any) {
    const modalRef = this.modalService.open(ProductDeleteComponent);
    modalRef.componentInstance.item = product;
  }// end createModal

   //modal de mis-à-jour
   updateModal(product: any) {
    const modalRef = this.modalService.open(ProductUpdateComponent,  { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = product;
  }//fin updateModal

}

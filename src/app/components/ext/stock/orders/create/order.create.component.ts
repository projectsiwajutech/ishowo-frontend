import { ItModalProductOrderSelectComponent } from './../../../utils/it-modal-prodorder-select/it.modal.prodorderselect.component';
import { ItModalProductSearchComponent } from './../../../utils/it-modal-prod-search/it.modal.prodsearch.component';
import {Component, HostListener, Input, Output, OnInit, OnChanges, EventEmitter, ViewChild,
  ViewEncapsulation, ElementRef   } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/map';

import {OrderService} from '../../../../services/order/order.service';
import {SupplierService} from '../../../../services/supplier/supplier.service';
import {CompartmentService} from '../../../../services/compartment/compartment.service';
import {CategoryService} from '../../../../services/category/category.service';
import {ProductService} from '../../../../services/product/product.service';
import {MeasureTypeService} from '../../../../services/measuretype/measuretype.service';

import {LibraryService} from '../../../../services/app/library.service';
import {Order} from "../../../../models/order/order";
import {Compartment} from "../../../../models/compartment/compartment";
import {Supplier} from "../../../../models/supplier/supplier";
import {Category} from "../../../../models/category/category";
import {MeasureType} from "../../../../models/measuretype/measuretype";
import {Product} from "../../../../models/product/product";
import {ProductInStock} from "../../../../models/product/productinstock";
import {Profil} from "../../../../models/profil/profil";
import {LocalStorageService} from "../../../../services/app/localstorage.service";
import {ProdMeasureType} from "../../../../models/prodmeasuretype/prodmeasuretype";
import {KEY_CODE} from "../../../../models/browser/KEY_CODE";

import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import {PrmProdStkView} from "../../../../models/query/PrmProdStkView";

@Component({
  selector: 'it-order-create',
  templateUrl: './order.create.component.html',
  encapsulation: ViewEncapsulation.None
  //styleUrls: ['./agencies.component.css']
})

export class OrderCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Order;
  modalRef: BsModalRef;

  //lists
  compartments: Compartment[] = [];
  suppliers: Supplier[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  measureTypes: ProdMeasureType[] = [];
  productsTypes: ProdMeasureType[] = [];

  //selected objects
  selectedCategory: Category;
  selectedProduct: Product;
  productsBycat: Product[]; filteredProducts: any[] = [];
  selectedMeasureType: ProdMeasureType; quantity: number; purchase_price: number; selling_price: number;
  code_barre: string = ""; exp_date: Date;

  //form related objects
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here
  @ViewChild('qty', {static: true}) qtyInput: ElementRef;
  @ViewChild('productname', {static: true}) productInput: ElementRef;

  //status for list loaded
    isProdListLoaded: boolean = false;
    isProdTypesListLoaded: boolean = false;

  //user connected
  user: Profil;

  constructor(
    private orderService: OrderService,
    private supplierService: SupplierService,
    private compartmentService: CompartmentService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private measureTypeService: MeasureTypeService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location, private modalService: BsModalService
  ) {
    this.subject = "Commande";
  }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item = new Order();
    //this.getProducts();
    this.getProductTypes();
    this.getCompartments();
    this.getSuppliers();
    this.getCategories();
  }

   ngAfterViewInit() {
    // this.productInput.nativeElement.focus(); //remove
   }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.item = new Order();   this.productsBycat = this.products;
  }//end ngOnChanges

  ///category select event
  onCategoryChange($event: any): void{
    this.productsBycat = this.products.filter(x => x.category.id === this.selectedCategory.id);
  }//fin onCategoryChange

  ///product select event
  onProductChange(): void {
    //this.qtyInput.nativeElement.focus();
    if(this.selectedMeasureType !== null && this.selectedMeasureType.product !== null &&
       this.selectedMeasureType !== undefined && this.selectedMeasureType.product !== undefined){
          this.code_barre = this.selectedMeasureType.product.reference;
    }

    //get prices if possible
      let prodView: PrmProdStkView = new PrmProdStkView(); prodView.id_profil = this.user.id;
      prodView.id_product = this.selectedMeasureType.id;

      this.productService.getProductStockView(prodView)
          .then(
              products => {
                  if(products.length !== 0){
                      this.purchase_price = products[0].purchase_price;
                      this.selling_price = products[0].selling_price;
                  }
              },
              error => {
              }
     );

    // this.measureTypes = [];
    //   this.selectedProduct.measure_types.filter(x => this.measureTypes.push(x) );
  }//fin onProductChange


  //add product line
  addProductLine(): void{
    let prodLine: ProductInStock = new ProductInStock();
    prodLine.product = this.selectedMeasureType;     prodLine.quantity = this.quantity;
    prodLine.purchase_price = this.purchase_price; prodLine.selling_price = this.selling_price;

    //check qty format
    if(!this.libraryService.isValidNumber(this.quantity)){this.libraryService.showMessage("Quantité non valide"); return;}
    if(!this.libraryService.isValidNumber(this.purchase_price)){this.libraryService.showMessage("Prix d'achat non valide"); return;}
    if(!this.libraryService.isValidNumber(this.selling_price)){this.libraryService.showMessage("Prix de vente non valide"); return;}

    //barcode
    if (this.code_barre !== '' && this.code_barre !== null && this.code_barre !== undefined) { prodLine.barcode = this.code_barre; }

     //barcode
    if (this.exp_date !== null && this.exp_date !== undefined) { prodLine.expiration_date = this.exp_date; }

    //add
    if(this.item.lines === undefined || this.item.lines === null ) { this.item.lines = []; }
    this.item.lines.push(prodLine);

    //reinit
    this.selectedProduct = null; this.quantity = 0; this.purchase_price = 0; this.selling_price = 0;
    this.code_barre = ''; this.exp_date = null;
    this.selectedMeasureType = null;
    //this.productsBycat = this.products;

    //add product amount paid supposed
    this.item.amount_paid = this.getTotal();
  }//fin addProductLine

  //remove product line
  removeProductLine(index: number) : void{
    this.item.lines.splice(index, 1);
  }//fin removeMeasureType

  //can add product
  canAddProd(): boolean{
    // let stateProduct: boolean = (this.selectedProduct === null || this.selectedProduct === undefined );

    let stateProduct: boolean = (this.selectedMeasureType === null || this.selectedMeasureType === undefined );
    let stateQuantity: boolean = (this.quantity ===0 || !this.libraryService.isValidNumber(this.quantity) );
    let statePurchasePrice: boolean = (this.purchase_price ===0 || !this.libraryService.isValidNumber(this.purchase_price) );
    let stateSellingPrice: boolean = (this.selling_price ===0 || !this.libraryService.isValidNumber(this.selling_price) );

    if (stateProduct === true || stateQuantity === true || statePurchasePrice === true || stateSellingPrice === true)
     { return false;} else { return true; }
  }//fin canAddProd

  //can save command
  canSaveCommand(): boolean{
    let stateSupplier: boolean = (this.item.supplier === null || this.item.supplier === undefined );
    let stateCompartment: boolean = (this.item.destination === null || this.item.destination === undefined );
    let stateProductLines: boolean = (this.item.lines === null || this.item.lines === undefined
     || this.item.lines.length === 0);

    if(stateSupplier === true || stateCompartment === true || stateProductLines === true){return false;} else { return true; }
  }//fin canSaveCommand

  //get total
  getTotal(): number {
    if(this.item.lines === undefined || this.item.lines === null ){ return 0; }
    if(this.item.lines.length === 0  ){ return 0; }

    let total: number = 0;
    total = this.item.lines
      .map(p => p.quantity * p.purchase_price)
      .reduce((sum, current) => sum + current);

    return total;
  }//fin getTotal

  //create object
  save(form : any){

    //checks
    if(this.item.lines === undefined || this.item.lines === null){this.item.lines = [];}
    if(this.item.lines.length === 0){this.libraryService.showMessage("Veuillez aujouter des produits à cette commande"); return;}

  //action
    this.item.agent = this.user;
	  this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.orderService.createOrder(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Order();
          this.statusMessage = "Commande crée avec succès";
          this.created.emit("created");
          window.setTimeout(() =>   {  this.isCompleted = false;   } , 1000);
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
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
    let link = ['/app/orders_main'];
    this.router.navigate(link);
  }

  //get list of suppliers
  getSuppliers(): void {
    this.suppliers = [];
    this.supplierService.getSuppliers(this.user)
      .then(
        suppliers => {
          this.suppliers = suppliers;
        },
        error => {
        }
      );
  }//fin getSuppliers

  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments

  //get list of agencies
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

  //get list of products
  getProducts(): void {
    this.products = [];
    this.productService.getProducts(this.user)
      .then(
        products => {
          this.products = products;
          this.productsBycat = products;
          this.isProdListLoaded = true;
        },
        error => {
        }
      );
  }//fin getProducts

  //get list of products
  getProductTypes(): void {
    this.products = [];
    this.productService.getProductTypes(this.user)
      .then(
        result => {
          this.productsTypes = result;
            this.isProdTypesListLoaded = true;
        },
        error => {
        }
      );
  }//fin getProductTypes

    //liste les commandes
  listCommand(): void{
    let link = ['/app/orders_list'];
    this.router.navigate(link);
  }//fin listCommand

  //button to ad a product
  addProductModal() {
    let options: ModalOptions = new ModalOptions();
    const initialState = {
      user: this.user,
      products: this.productsTypes,
    };
    options.initialState = initialState;
    options.class = "large";

    this.modalRef = this.modalService.show(ItModalProductSearchComponent, options);
    this.modalRef.content.closed.subscribe((selProds: ProductInStock[]) => {
        //add products
        if (this.item.lines === undefined || this.item.lines === null ) { this.item.lines = []; }
        this.item.lines.push(...selProds);
    });
    this.modalRef.content.closeBtnName = 'Close';
  }//fin addProductModal


  //select a product
  selectProductModal() {
    let options: ModalOptions = new ModalOptions();
    const initialState = {
      user: this.user,
      products: this.productsTypes,
    };
    options.initialState = initialState;
    options.class = "large";

    this.modalRef = this.modalService.show(ItModalProductOrderSelectComponent, options);
    this.modalRef.content.closed.subscribe((selProds: ProductInStock[]) => {
        //add products
        if (this.item.lines === undefined || this.item.lines === null ) { this.item.lines = []; }
        this.item.lines.push(...selProds);
    });
    this.modalRef.content.closeBtnName = 'Close';
  }//fin selectProductModal

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      //case KEY_CODE.P:  this.addProductLine(); break;
      case KEY_CODE.ADD:  this.addProductLine(); break;
      default: break;
    }
  }//end keyEvent

    //filter products by name
   filterProducts(event: any) {
        this.filteredProducts = [];
        for (let i = 0; i < this.productsTypes.length; i++) {
            let prodItem = this.productsTypes[i];
            if (prodItem.product.name.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredProducts.push(prodItem);
            }
        }
    }//end filterProducts



}

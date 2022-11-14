import { Component, OnChanges, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product/product';
import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { StockLimitService } from 'src/app/shared/services/stocklimit/stocklimit.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Supplier } from 'src/app/shared/models/supplier/supplier';
import { SupplierService } from 'src/app/shared/services/supplier/supplier.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';

@Component({
  selector: 'app-commande-create',
  templateUrl: './commande-create.component.html',
  styleUrls: ['./commande-create.component.scss']
})
export class CommandeCreateComponent implements OnInit, OnChanges {

  products: Product[] = [];
  stock_view: ProductInStock[] = [];
  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  is_checked: boolean;
  DefautQte: number = 1;
  underStockList: ProductInStock[] = [];
  item: ProductInStock[] = [];
  measureTypes: ProdMeasureType[] = [];
  productsTypes: ProdMeasureType[] = [];
  productSearchName: string; productSearchCode: string; productSearchQte: number; DefaultAgency: string;
  productSelected: ProductInStock;
  QtInValid: boolean; PaInValid: boolean; PvInValid: boolean;
  prodLine: ProductInStock; compartments: Compartment[] = [];
  suppliers: Supplier[] = [];

  public saveUsername: boolean = false;

  constructor(
    private productService: ProductService,
    private locStorService: LocalStorageService,
    private stockLimitService: StockLimitService,
    private libraryService: LibraryService,
    private supplierService: SupplierService,
    private compartmentService: CompartmentService,
    private router: Router,
  ) { }

  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
  }
  //user connecte
  user: Profil;

  //status for list loaded
  isProdListLoaded: boolean = false;
  isProdTypesListLoaded: boolean = false;

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.ProductInStock();
    this.getCompartments();
    this.getSuppliers();
    this.getUnderStockProdList();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
  }//end ngOnChanges

  //getProduct Selected
  getSelectedProd(produit: ProductInStock) {
    let product = this.stock_view.filter(prodInStock => prodInStock.product.product.id == produit.product.product.id)[0];
    if (product !== undefined) {
      this.productSelected = produit;
      this.DefautQte = 1;
      this.inputQTE(this.DefautQte);
      this.inputPA(produit.purchase_price);
      this.inputPV(produit.selling_price);
    }
  }//fin getProduct Selected

  //add product line
  addProductLine(form: any, produit: ProductInStock): void {
    let prodExist: any = this.item.filter(prod => prod.product.product.id == produit.product.product.id && prod.product.measure_type.id == produit.product.measure_type.id)[0];
    if (prodExist !== undefined) {
      this.warningSwall();
    }
    else {
      let prodLine = this.stock_view.filter(prodInStock => prodInStock.product.id == produit.product.id)[0];
      if (prodLine !== undefined) {

        let productLine: ProductInStock = {
          id: produit.id,
          product: prodLine.product,
          compartment: prodLine.compartment,
          quantity: form.quantity,
          quantity_transfer: 0,
          quantity_sell: 0,
          purchase_price: form.p_achat,
          selling_price: form.p_vente,
          barcode: produit.barcode,
          expiration_date: form.date_exp,
          is_checked: true
        }
        //add
        if (this.item === undefined || this.item === null) { this.item = []; }
        this.item.push(productLine);

      }
      // //reinit

      let resetProduct: ProductInStock = {
        id: 0,
        product: new ProdMeasureType(),
        compartment: new Compartment(),
        quantity: 0,
        quantity_transfer: 0,
        quantity_sell: 0,
        purchase_price: 0,
        selling_price: 0,
        barcode: undefined,
        expiration_date: undefined,
        is_checked: false
      }
      this.QtInValid = true;
      this.PaInValid = true;
      this.PvInValid = true;
      this.DefautQte = 0;
      this.productSelected = resetProduct;
    }
  }//fin addProductLine

  //addLine by Checkbox
  addProductByCheckBox(product: ProductInStock) {
    //add
    if (this.item === undefined || this.item === null) { this.item = []; }
    this.item.push(product);

  }//fin addLine By Checkbox

  //add Suggested Products
  addSuggestedProduct() {
    this.underStockList.forEach(element => {
      let product: any = this.item.filter(prod => (prod.product.measure_type.id == element.product.measure_type.id) && (prod.product.id == element.product.id))[0];
      if (product === undefined) {
        this.addProductByUnderStockList(element);
      }
      else if (product !== undefined) {
        this.warningSwal();
      }
    });
  }// end add Suggested Products

  //add Product By UnderStockList
  addProductByUnderStockList(item: ProductInStock) {
    let productLine: ProductInStock = {
      id: item.product.product.id,
      product: item.product,
      compartment: item.compartment,
      quantity: 1,
      quantity_transfer: 0,
      quantity_sell: 0,
      purchase_price: 1,
      selling_price: 1,
      barcode: item.barcode,
      expiration_date: new Date(),
      is_checked: true,
    }
    //add
    if (this.item === undefined || this.item === null) { this.item = []; }
    this.item.push(productLine);

  }//fin add Product By UnderStockList

  //remove product in Lines
  RemoveProduct(id: number) {
    this.item.splice(id, 1);
  }//fin removeproduct in Lines

  //OnchangeCheckbox Of Checkbox
  OnchangeStatut($event, Prodline: ProductInStock) {
    const id = $event.target.value;
    this.is_checked = $event.target.checked;
    let product: any = this.item.filter(prod => prod.id == id)[0];

    if (this.is_checked == false) {
      product.is_checked = this.is_checked;
      let index = this.item.findIndex(x => x.id == product.id);
      this.RemoveProduct(index);
    }
    else {
      if (product === undefined) {
        Prodline.is_checked = this.is_checked;
        Prodline.quantity = 1;
        this.addProductByCheckBox(Prodline);
      }
      else if (product !== undefined) {
        product.is_checked = this.is_checked;
        let index = this.item.findIndex(x => x.id == product.id);
        this.RemoveProduct(index);
      }
    }
  }// fin OnChangeStatut Of Checkbox

  //get list of products stock view
  ProductInStock(): void {
    this.stock_view = []; this.isLoading = true;
    this.productService.getStockView(this.user)
      .then(
        stock_view => {
          this.stock_view = stock_view;
          this.isLoading = false;
        },
        error => { this.isLoading = false; }
      );
  }//fin getStockView

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

  //get list of stock limit
  getUnderStockProdList(): void {
    this.isLoading = true; this.underStockList = [];
    this.stockLimitService.getProdUnderStockLimit(this.user)
      .then(
        underStockList => {
          this.isLoading = false;
          this.underStockList = underStockList;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getUnderStockProdList

  //verification champ qte
  inputQTE(value: number) {
    if (value < 1) {
      this.QtInValid = true;
    } else {
      this.QtInValid = false;
    }
  }//fin verification champ qte

  //verification champ p_achat
  inputPA(value: number) {
    if (value < 1) {
      this.PaInValid = true;
    } else {
      this.PaInValid = false;
    }
  }//fin verification p_achat qte

  //verification champ p_vente
  inputPV(value: number) {
    if (value < 1) {
      this.PvInValid = true;
    } else {
      this.PvInValid = false;
    }
  }//fin verification champ p_vente

  //enregistrement agence
  saveAgency(item: Compartment) {
    this.DefaultAgency = item.agency.name;
    this.locStorService.saveToSession('compartment', this.item);
  }//fin enregistrement agence

  //enregistrement rayon
  saveSupplier(item: Supplier) {
    this.locStorService.saveToSession('supplier', this.item);
  }//fin enregistrement rayon


  //send OrderListProducts
  sendOrderListProducts() {
    if (this.item.length === 0) {
      Swal.fire({
        customClass: { container: 'myCustomSwal' },
        title: 'Liste Vide',
        text: 'Veuillez ajoutez au moins un produit !',
        icon: 'warning'
      })
    }
    else {
      if (localStorage.getItem('addedProducts')) {
        let tabOne = this.locStorService.readFromSession('addedProducts');
        let refreshTable = this.libraryService.getGoodTable(tabOne, this.item);
        this.locStorService.saveToSession('addedProducts', refreshTable)
        let newRouterLink = "stocks/listnew";
        this.router.navigate([newRouterLink]);
      }
      else {
        this.locStorService.saveToSession('addedProducts', this.item);
        let newRouterLink = "stocks/listnew";
        this.router.navigate([newRouterLink]);
      }
    }
  }
  //fin send OrderListProducts

  //Avertissement
  warningSwal() {
    this.libraryService.onWarning('Les produits suggérés ont déjà été ajoutés!', 1500, 'top-end');
  }// fin avertissement

  //Avertissement2
  warningSwall() {
    this.libraryService.onWarning('Ce produit a déjà été ajouté!', 1500, 'top-end');
  }// fin avertissement2


}

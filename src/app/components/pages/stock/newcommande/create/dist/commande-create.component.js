"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommandeCreateComponent = void 0;
var core_1 = require("@angular/core");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var prodmeasuretype_1 = require("src/app/shared/models/prodmeasuretype/prodmeasuretype");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var CommandeCreateComponent = /** @class */ (function () {
    function CommandeCreateComponent(productService, locStorService, stockLimitService, libraryService, supplierService, compartmentService, router) {
        this.productService = productService;
        this.locStorService = locStorService;
        this.stockLimitService = stockLimitService;
        this.libraryService = libraryService;
        this.supplierService = supplierService;
        this.compartmentService = compartmentService;
        this.router = router;
        this.products = [];
        this.stock_view = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.DefautQte = 1;
        this.underStockList = [];
        this.item = [];
        this.measureTypes = [];
        this.productsTypes = [];
        this.compartments = [];
        this.suppliers = [];
        this.saveUsername = false;
        //status for list loaded
        this.isProdListLoaded = false;
        this.isProdTypesListLoaded = false;
    }
    CommandeCreateComponent.prototype.onSaveUsernameChanged = function (value) {
        this.saveUsername = value;
    };
    CommandeCreateComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.ProductInStock();
        this.getCompartments();
        this.getSuppliers();
        this.getUnderStockProdList();
    };
    CommandeCreateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
    }; //end ngOnChanges
    //getProduct Selected
    CommandeCreateComponent.prototype.getSelectedProd = function (produit) {
        var product = this.stock_view.filter(function (prodInStock) { return prodInStock.product.product.id == produit.product.product.id; })[0];
        if (product !== undefined) {
            this.productSelected = produit;
            this.DefautQte = 1;
            this.inputQTE(this.DefautQte);
            this.inputPA(produit.purchase_price);
            this.inputPV(produit.selling_price);
        }
    }; //fin getProduct Selected
    //add product line
    CommandeCreateComponent.prototype.addProductLine = function (form, produit) {
        var prodExist = this.item.filter(function (prod) { return prod.product.product.id == produit.product.product.id && prod.product.measure_type.id == produit.product.measure_type.id; })[0];
        if (prodExist !== undefined) {
            this.warningSwall();
        }
        else {
            var prodLine = this.stock_view.filter(function (prodInStock) { return prodInStock.product.id == produit.product.id; })[0];
            if (prodLine !== undefined) {
                var productLine = {
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
                };
                //add
                if (this.item === undefined || this.item === null) {
                    this.item = [];
                }
                this.item.push(productLine);
            }
            // //reinit
            var resetProduct = {
                id: 0,
                product: new prodmeasuretype_1.ProdMeasureType(),
                compartment: new compartment_1.Compartment(),
                quantity: 0,
                quantity_transfer: 0,
                quantity_sell: 0,
                purchase_price: 0,
                selling_price: 0,
                barcode: undefined,
                expiration_date: undefined,
                is_checked: false
            };
            this.QtInValid = true;
            this.PaInValid = true;
            this.PvInValid = true;
            this.DefautQte = 0;
            this.productSelected = resetProduct;
        }
    }; //fin addProductLine
    //addLine by Checkbox
    CommandeCreateComponent.prototype.addProductByCheckBox = function (product) {
        //add
        if (this.item === undefined || this.item === null) {
            this.item = [];
        }
        this.item.push(product);
    }; //fin addLine By Checkbox
    //add Suggested Products
    CommandeCreateComponent.prototype.addSuggestedProduct = function () {
        var _this = this;
        this.underStockList.forEach(function (element) {
            var product = _this.item.filter(function (prod) { return (prod.product.measure_type.id == element.product.measure_type.id) && (prod.product.id == element.product.id); })[0];
            if (product === undefined) {
                _this.addProductByUnderStockList(element);
            }
            else if (product !== undefined) {
                _this.warningSwal();
            }
        });
    }; // end add Suggested Products
    //add Product By UnderStockList
    CommandeCreateComponent.prototype.addProductByUnderStockList = function (item) {
        var productLine = {
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
            is_checked: true
        };
        //add
        if (this.item === undefined || this.item === null) {
            this.item = [];
        }
        this.item.push(productLine);
    }; //fin add Product By UnderStockList
    //remove product in Lines
    CommandeCreateComponent.prototype.RemoveProduct = function (id) {
        this.item.splice(id, 1);
    }; //fin removeproduct in Lines
    //OnchangeCheckbox Of Checkbox
    CommandeCreateComponent.prototype.OnchangeStatut = function ($event, Prodline) {
        var id = $event.target.value;
        this.is_checked = $event.target.checked;
        var product = this.item.filter(function (prod) { return prod.id == id; })[0];
        if (this.is_checked == false) {
            product.is_checked = this.is_checked;
            var index = this.item.findIndex(function (x) { return x.id == product.id; });
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
                var index = this.item.findIndex(function (x) { return x.id == product.id; });
                this.RemoveProduct(index);
            }
        }
    }; // fin OnChangeStatut Of Checkbox
    //get list of products stock view
    CommandeCreateComponent.prototype.ProductInStock = function () {
        var _this = this;
        this.stock_view = [];
        this.isLoading = true;
        this.productService.getStockView(this.user)
            .then(function (stock_view) {
            _this.stock_view = stock_view;
            _this.isLoading = false;
        }, function (error) { _this.isLoading = false; });
    }; //fin getStockView
    //get list of compartments
    CommandeCreateComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            _this.compartments = compartments;
        }, function (error) {
        });
    }; //fin getCompartments
    //get list of suppliers
    CommandeCreateComponent.prototype.getSuppliers = function () {
        var _this = this;
        this.suppliers = [];
        this.supplierService.getSuppliers(this.user)
            .then(function (suppliers) {
            _this.suppliers = suppliers;
        }, function (error) {
        });
    }; //fin getSuppliers
    //get list of stock limit
    CommandeCreateComponent.prototype.getUnderStockProdList = function () {
        var _this = this;
        this.isLoading = true;
        this.underStockList = [];
        this.stockLimitService.getProdUnderStockLimit(this.user)
            .then(function (underStockList) {
            _this.isLoading = false;
            _this.underStockList = underStockList;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getUnderStockProdList
    //verification champ qte
    CommandeCreateComponent.prototype.inputQTE = function (value) {
        if (value < 1) {
            this.QtInValid = true;
        }
        else {
            this.QtInValid = false;
        }
    }; //fin verification champ qte
    //verification champ p_achat
    CommandeCreateComponent.prototype.inputPA = function (value) {
        if (value < 1) {
            this.PaInValid = true;
        }
        else {
            this.PaInValid = false;
        }
    }; //fin verification p_achat qte
    //verification champ p_vente
    CommandeCreateComponent.prototype.inputPV = function (value) {
        if (value < 1) {
            this.PvInValid = true;
        }
        else {
            this.PvInValid = false;
        }
    }; //fin verification champ p_vente
    //enregistrement agence
    CommandeCreateComponent.prototype.saveAgency = function (item) {
        this.DefaultAgency = item.agency.name;
        this.locStorService.saveToSession('compartment', this.item);
    }; //fin enregistrement agence
    //enregistrement rayon
    CommandeCreateComponent.prototype.saveSupplier = function (item) {
        this.locStorService.saveToSession('supplier', this.item);
    }; //fin enregistrement rayon
    //send OrderListProducts
    CommandeCreateComponent.prototype.sendOrderListProducts = function () {
        if (this.item.length === 0) {
            sweetalert2_js_1["default"].fire({
                customClass: { container: 'myCustomSwal' },
                title: 'Liste Vide',
                text: 'Veuillez ajoutez au moins un produit !',
                icon: 'warning'
            });
        }
        else {
            if (localStorage.getItem('addedProducts')) {
                var tabOne = this.locStorService.readFromSession('addedProducts');
                var refreshTable = this.libraryService.getGoodTable(tabOne, this.item);
                this.locStorService.saveToSession('addedProducts', refreshTable);
                var newRouterLink = "stocks/listnew";
                this.router.navigate([newRouterLink]);
            }
            else {
                this.locStorService.saveToSession('addedProducts', this.item);
                var newRouterLink = "stocks/listnew";
                this.router.navigate([newRouterLink]);
            }
        }
    };
    //fin send OrderListProducts
    //Avertissement
    CommandeCreateComponent.prototype.warningSwal = function () {
        this.libraryService.onWarning('Les produits suggérés ont déjà été ajoutés!', 1500, 'top-end');
    }; // fin avertissement
    //Avertissement2
    CommandeCreateComponent.prototype.warningSwall = function () {
        this.libraryService.onWarning('Ce produit a déjà été ajouté!', 1500, 'top-end');
    }; // fin avertissement2
    CommandeCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-commande-create',
            templateUrl: './commande-create.component.html',
            styleUrls: ['./commande-create.component.scss']
        })
    ], CommandeCreateComponent);
    return CommandeCreateComponent;
}());
exports.CommandeCreateComponent = CommandeCreateComponent;

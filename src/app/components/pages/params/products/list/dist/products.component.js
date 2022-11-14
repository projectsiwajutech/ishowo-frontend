"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsComponent = void 0;
var core_1 = require("@angular/core");
var category_1 = require("src/app/shared/models/category/category");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var product_create_component_1 = require("../create/product-create.component");
var product_delete_component_1 = require("../delete/product-delete.component");
var product_update_component_1 = require("../update/product-update.component");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(modalService, constantService, productService, categoryService, locStorService, libraryService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.locStorService = locStorService;
        this.libraryService = libraryService;
        this.route = route;
        this.products = [];
        this.page = 1;
        this.pageSize = 30;
        this.isCreateVisible = false;
        this.isLoading = false;
        this.param = new ProductParam_1.ProductParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.dtOptions = this.constantService.DtOptions;
        this.user = this.locStorService.getUser();
        this.getCategories();
        this.getProducts();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //search list of products stock view
    ProductsComponent.prototype.searchProducts = function () {
        var _this = this;
        this.isLoading = true;
        this.products = [];
        var prodObj = { product_categ: this.param.category, product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };
        this.productService.searchProducts(this.user, prodObj)
            .then(function (products) {
            _this.isLoading = false;
            if (products.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.products = products;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchProducts
    //get list of products
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        this.isLoading = true;
        this.products = [];
        this.productService.getProducts(this.user)
            .then(function (products) {
            _this.isLoading = false;
            if (products.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.products = products;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getProducts
    //track by
    ProductsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //get list of categories
    ProductsComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            var emptyObj = new category_1.Category();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.categories.push(emptyObj);
            categories.filter(function (obj) { return _this.categories.push(obj); });
        }, function (error) {
        });
    }; //fin getCategories
    //modal d'ajout
    ProductsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(product_create_component_1.ProductCreateComponent, { size: 'xl', backdrop: 'static' });
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    ProductsComponent.prototype.deleteModal = function (product) {
        var modalRef = this.modalService.open(product_delete_component_1.ProductDeleteComponent);
        modalRef.componentInstance.item = product;
    }; // end createModal
    //modal de mis-à-jour
    ProductsComponent.prototype.updateModal = function (product) {
        var modalRef = this.modalService.open(product_update_component_1.ProductUpdateComponent, { size: 'xl', backdrop: 'static' });
        modalRef.componentInstance.item = product;
    }; //fin updateModal
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;

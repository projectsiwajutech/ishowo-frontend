"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockLimitCreateComponent = void 0;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var category_1 = require("../../../../models/category/category");
var prodmeasuretype_1 = require("../../../../models/prodmeasuretype/prodmeasuretype");
var StockLimitCreateComponent = /** @class */ (function () {
    function StockLimitCreateComponent(productService, categoryService, stockLimitService, locStorService, route, location) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.stockLimitService = stockLimitService;
        this.locStorService = locStorService;
        this.route = route;
        this.location = location;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    StockLimitCreateComponent.prototype.ngOnInit = function () {
        this.item = new prodmeasuretype_1.ProdMeasureType();
        this.user = this.locStorService.getUser();
        this.getProducts();
        this.getCategories();
    };
    StockLimitCreateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.item = new prodmeasuretype_1.ProdMeasureType();
        this.selectedCategory = new category_1.Category();
    }; //end ngOnChanges
    //create object
    StockLimitCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.stockLimitService.createStockLimit(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            // /this.item = result;
            _this.item = new prodmeasuretype_1.ProdMeasureType();
            _this.products = _this.allProducts;
            _this.created.emit("created");
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        });
    };
    //update list of products on cat select
    StockLimitCreateComponent.prototype.updateProdOnCat = function () {
        var _this = this;
        this.products = this.allProducts.filter(function (x) { return x.category.id === _this.selectedCategory.id; });
    }; //fin updateMeasTypOnProd
    //update list of measure types on product select
    StockLimitCreateComponent.prototype.updateMeasTypOnProd = function () {
        var _this = this;
        this.measureTypes = [];
        this.item.product.measure_types.filter(function (x) { return _this.measureTypes.push(x.measure_type); });
    }; //fin updateMeasTypOnProd
    //show creation form
    StockLimitCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    }; //fin showCreationForm
    //hide the form
    StockLimitCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new prodmeasuretype_1.ProdMeasureType();
    }; //fin hideForm
    //get list of products
    StockLimitCreateComponent.prototype.getProducts = function () {
        var _this = this;
        this.products = [];
        this.productService.getProducts(this.user)
            .then(function (products) {
            _this.allProducts = products;
            _this.products = products;
        }, function (error) {
        });
    }; //fin getProducts
    //get list of categories
    StockLimitCreateComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            _this.categories = categories;
        }, function (error) {
        });
    }; //fin getCategories
    __decorate([
        core_1.Input()
    ], StockLimitCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], StockLimitCreateComponent.prototype, "created");
    StockLimitCreateComponent = __decorate([
        core_1.Component({
            selector: 'it-stock-limit-create',
            templateUrl: './stock.limit.create.component.html'
        })
    ], StockLimitCreateComponent);
    return StockLimitCreateComponent;
}());
exports.StockLimitCreateComponent = StockLimitCreateComponent;

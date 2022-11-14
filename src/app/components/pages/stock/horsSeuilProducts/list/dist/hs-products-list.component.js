"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HsProductsListComponent = void 0;
var core_1 = require("@angular/core");
var agency_1 = require("src/app/shared/models/agency/agency");
var category_1 = require("src/app/shared/models/category/category");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var measuretype_1 = require("src/app/shared/models/measuretype/measuretype");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var HsProductsListComponent = /** @class */ (function () {
    function HsProductsListComponent(stockLimitService, measureTypeService, productService, locStorService, categoryService, compartmentService, agencyService, router) {
        this.stockLimitService = stockLimitService;
        this.measureTypeService = measureTypeService;
        this.productService = productService;
        this.locStorService = locStorService;
        this.categoryService = categoryService;
        this.compartmentService = compartmentService;
        this.agencyService = agencyService;
        this.router = router;
        this.underStockList = [];
        this.isOnDashBoard = true;
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
        //filter variables
        this.param = new ProductParam_1.ProductParam();
    }
    HsProductsListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getUnderStockProdList();
        this.getMeasureTypes();
    };
    //get list of stock limit
    HsProductsListComponent.prototype.getUnderStockProdList = function () {
        var _this = this;
        this.isLoading = true;
        this.underStockList = [];
        this.stockLimitService.getProdUnderStockLimit(this.user)
            .then(function (underStockList) {
            _this.isLoading = false;
            if (underStockList.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.underStockList = underStockList;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getUnderStockProdList
    //track by
    HsProductsListComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    HsProductsListComponent.prototype.hideForm = function () {
        var link = ['/app/orders_main'];
        this.router.navigate(link);
    };
    //get list of measure types
    HsProductsListComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measureTypes) {
            var emptyObj = new measuretype_1.MeasureType();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.measureTypes.push(emptyObj);
            if (measureTypes !== null) {
                measureTypes.filter(function (obj) { return _this.measureTypes.push(obj); });
            }
            //this.measureTypes = measureTypes;
        }, function (error) {
        });
    }; //fin getMeasureTypes
    //search list of products stock view
    HsProductsListComponent.prototype.searchStockView = function () {
        var _this = this;
        this.isLoading = true;
        this.underStockList = [];
        var prodObj = { product_name: this.param.product, product_code: this.param.codebarre, id_profile: 0 };
        this.productService.searchStockView(this.user, prodObj)
            .then(function (underStockList) {
            _this.isLoading = false;
            if (underStockList.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.underStockList = underStockList;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchStockView
    //get list of categories
    HsProductsListComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            var emptyObj = new category_1.Category();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.categories.push(emptyObj);
            if (categories !== null) {
                categories.filter(function (obj) { return _this.categories.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getCategories
    //get list of compartments
    HsProductsListComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            var emptyObj = new compartment_1.Compartment();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.compartments.push(emptyObj);
            if (compartments !== null) {
                compartments.filter(function (obj) { return _this.compartments.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getCompartments
    //get list of agencies
    HsProductsListComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            var emptyObj = new agency_1.Agency();
            emptyObj.id = 0;
            emptyObj.name = "Toutes";
            _this.agencies.push(emptyObj);
            if (agencies !== null) {
                agencies.filter(function (obj) { return _this.agencies.push(obj); });
            }
        }, function (error) {
        });
    }; //fin getAgencies
    __decorate([
        core_1.Input()
    ], HsProductsListComponent.prototype, "isOnDashBoard");
    HsProductsListComponent = __decorate([
        core_1.Component({
            selector: 'app-hs-products-list',
            templateUrl: './hs-products-list.component.html',
            styleUrls: ['./hs-products-list.component.scss']
        })
    ], HsProductsListComponent);
    return HsProductsListComponent;
}());
exports.HsProductsListComponent = HsProductsListComponent;

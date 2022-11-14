"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductGlobalStatsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var globalreport_1 = require("src/app/shared/models/stats/globalreport");
var ProductGlobalStatsComponent = /** @class */ (function () {
    function ProductGlobalStatsComponent(statsService, productService, locStorService, route) {
        this.statsService = statsService;
        this.productService = productService;
        this.locStorService = locStorService;
        this.route = route;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        //report var
        this.report = new globalreport_1.GlobalReport();
        this.isLoadingStats = false;
        this.param = new PeriodParam_1.PeriodParam();
        this.product_types = [];
        this.isLoadingStock = false;
        this.productSearchName = "";
    }
    ProductGlobalStatsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getStatsByPeriod();
        this.getProductTypes();
    };
    //show by period stats
    ProductGlobalStatsComponent.prototype.getStatsByPeriod = function () {
        var _this = this;
        this.isLoadingStats = true;
        this.statsService.getProductPeriodGlobalStats(this.param)
            .then(function (result) {
            _this.isLoadingStats = false;
            _this.report = result;
            if (_this.report === null)
                _this.report = new globalreport_1.GlobalReport();
        }, function (error) {
            _this.report = new globalreport_1.GlobalReport();
            _this.isLoadingStats = false;
        });
    }; //fin getStatsByPeriod
    //get product name
    ProductGlobalStatsComponent.prototype.getProductName = function (obj) {
        if (obj !== null && obj !== undefined) {
            if (obj.product !== null && obj.product !== undefined) {
                return obj.product.product.name;
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    }; //fin getProductName
    //get product measure type
    ProductGlobalStatsComponent.prototype.getProductMeasureType = function (obj) {
        if (obj !== null && obj !== undefined) {
            if (obj.product !== null && obj.product !== undefined) {
                return "(" + obj.product.measure_type.name + ")";
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    }; //fin getProdMeasureType
    //get product quantity or amount
    ProductGlobalStatsComponent.prototype.getProductQA = function (obj) {
        if (obj !== null && obj !== undefined) {
            return obj.quantity;
        }
        else {
            return 0;
        }
    }; //fin getProdQA
    //On Change Date1
    ProductGlobalStatsComponent.prototype.getSelectedDate1 = function (dateStart) {
        var format = new Date(dateStart);
        this.param.startDate = format;
        this.getStatsByPeriod();
    }; // fin
    //On Change Date2
    ProductGlobalStatsComponent.prototype.getSelectedDate2 = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.param.endDate = format;
        this.getStatsByPeriod();
    }; //On Change Date2
    //get list of products stock view
    ProductGlobalStatsComponent.prototype.getProductTypes = function () {
        var _this = this;
        this.product_types = [];
        this.isLoadingStock = true;
        this.productService.getProductTypes(this.user)
            .then(function (product_types) {
            _this.product_types = product_types;
            _this.isLoadingStock = false;
        }, function (error) { _this.isLoadingStock = true; });
    }; //fin getProductTypes
    //select product
    ProductGlobalStatsComponent.prototype.selectProd = function (obj) {
        this.param.startDate = this.DefaultDateOne;
        this.param.endDate = this.DefaultDateTwo;
        this.param.product = obj;
        this.report = new globalreport_1.GlobalReport();
        this.getStatsByPeriod();
    }; //fin selectProd
    //can get stats
    ProductGlobalStatsComponent.prototype.canGetStats = function () {
        var stateStartDate = (this.param.product === null || this.param.product === undefined);
        if (stateStartDate === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canGetStats
    //get product name selected
    ProductGlobalStatsComponent.prototype.getProductSelectedName = function () {
        if (this.param === null || this.param === undefined)
            return "";
        if (this.param.product === null || this.param.product === undefined)
            return "";
        return this.param.product.product.name;
    }; //fin getProductSelectedName
    //get product type selected
    ProductGlobalStatsComponent.prototype.getProductSelectedMeasureType = function () {
        if (this.param === null || this.param === undefined)
            return "";
        if (this.param.product === null || this.param.product === undefined)
            return "";
        return this.param.product.measure_type.name;
    }; //fin getProductMeasureType
    ProductGlobalStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-product-global-stats',
            templateUrl: './product-global-stats.component.html',
            styleUrls: ['./product-global-stats.component.scss']
        })
    ], ProductGlobalStatsComponent);
    return ProductGlobalStatsComponent;
}());
exports.ProductGlobalStatsComponent = ProductGlobalStatsComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductSoldStatsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var ProductSoldStatsComponent = /** @class */ (function () {
    function ProductSoldStatsComponent(statsService, productService, locStorService, route) {
        this.statsService = statsService;
        this.productService = productService;
        this.locStorService = locStorService;
        this.route = route;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        //report var
        this.reportProdQty = [];
        this.reportProdCa = [];
        this.reportProdProfit = [];
        this.isLoadingStatsQty = false;
        this.isLoadingStatsCa = false;
        this.isLoadingStatsProfit = false;
        this.param = new PeriodParam_1.PeriodParam();
        this.product_types = [];
        this.isLoadingStock = false;
        this.productQtySearchName = "";
        this.productCaSearchName = "";
        this.productProfitSearchName = "";
    }
    ProductSoldStatsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.param.startDate = this.DefaultDateOne;
        this.param.endDate = this.DefaultDateTwo;
        this.getProductsStats();
    };
    //show by period stats
    ProductSoldStatsComponent.prototype.getProductsStats = function () {
        this.getStatsOnProductQtySoldByPeriod();
        this.getStatsOnProductCaByPeriod();
        this.getStatsOnProductProfitByPeriod();
    };
    //show by period stats
    ProductSoldStatsComponent.prototype.getStatsOnProductQtySoldByPeriod = function () {
        var _this = this;
        this.isLoadingStatsQty = true;
        this.reportProdQty = [];
        this.statsService.getProductSoldByQuantityStats(this.param)
            .then(function (result) {
            _this.isLoadingStatsQty = false;
            _this.reportProdQty = result;
            if (_this.reportProdQty === null)
                _this.reportProdQty = [];
        }, function (error) {
            _this.reportProdQty = [];
            _this.isLoadingStatsQty = false;
        });
    }; //fin getStatsOnProductQtySoldByPeriod
    //show by period stats
    ProductSoldStatsComponent.prototype.getStatsOnProductCaByPeriod = function () {
        var _this = this;
        this.isLoadingStatsCa = true;
        this.reportProdCa = [];
        this.statsService.getProductSoldByCaStats(this.param)
            .then(function (result) {
            _this.isLoadingStatsCa = false;
            _this.reportProdCa = result;
            if (_this.reportProdCa === null)
                _this.reportProdCa = [];
        }, function (error) {
            _this.reportProdCa = [];
            _this.isLoadingStatsCa = false;
        });
    }; //fin getStatsOnProductCaByPeriod
    //show by period stats
    ProductSoldStatsComponent.prototype.getStatsOnProductProfitByPeriod = function () {
        var _this = this;
        this.isLoadingStatsProfit = true;
        this.reportProdProfit = [];
        this.statsService.getProductSoldByProfitStats(this.param)
            .then(function (result) {
            _this.isLoadingStatsProfit = false;
            _this.reportProdProfit = result;
            if (_this.reportProdProfit === null)
                _this.reportProdProfit = [];
        }, function (error) {
            _this.reportProdProfit = [];
            _this.isLoadingStatsProfit = false;
        });
    }; //fin getStatsOnProductProfitByPeriod
    //On Change Date1
    ProductSoldStatsComponent.prototype.getSelectedDate1 = function (dateStart) {
        var format = new Date(dateStart);
        format.setHours(24, 0, 0, 0);
        this.param.startDate = format;
    }; // fin 
    //On Change Date2
    ProductSoldStatsComponent.prototype.getSelectedDate2 = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.param.endDate = format;
    }; //On Change Date2
    //can get stats
    ProductSoldStatsComponent.prototype.canGetStats = function () {
        var stateStartDate = (this.param.product === null || this.param.product === undefined);
        if (stateStartDate === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canGetStats
    //get product name selected
    ProductSoldStatsComponent.prototype.getProductSelectedName = function () {
        if (this.param === null || this.param === undefined)
            return "";
        if (this.param.product === null || this.param.product === undefined)
            return "";
        return this.param.product.product.name + '(' + this.param.product.measure_type.name + ')';
    }; //fin getProductSelectedName
    ProductSoldStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-product-sold-stats',
            templateUrl: './product-sold-stats.component.html',
            styleUrls: ['./product-sold-stats.component.scss']
        })
    ], ProductSoldStatsComponent);
    return ProductSoldStatsComponent;
}());
exports.ProductSoldStatsComponent = ProductSoldStatsComponent;

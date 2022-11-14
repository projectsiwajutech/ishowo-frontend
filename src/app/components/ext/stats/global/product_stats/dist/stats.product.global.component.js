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
require("rxjs/add/operator/map");
var globalreport_1 = require("../../../../models/stats/globalreport");
var PeriodParam_1 = require("../../../../models/query/PeriodParam");
var ProductGlobalStatsComponent = /** @class */ (function () {
    function ProductGlobalStatsComponent(statsService, productService, locStorService, route, location) {
        this.statsService = statsService;
        this.productService = productService;
        this.locStorService = locStorService;
        this.route = route;
        this.location = location;
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
        this.getProductTypes();
    };
    ProductGlobalStatsComponent.prototype.ngOnChanges = function () {
    }; //end ngOnChanges
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
    ProductGlobalStatsComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    ProductGlobalStatsComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
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
        this.param.product = obj;
        this.report = new globalreport_1.GlobalReport();
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
        return this.param.product.product.name + '(' + this.param.product.measure_type.name + ')';
    }; //fin getProductSelectedName
    ProductGlobalStatsComponent = __decorate([
        core_1.Component({
            selector: 'it-stats-product-global',
            templateUrl: './stats.product.global.component.html'
        })
    ], ProductGlobalStatsComponent);
    return ProductGlobalStatsComponent;
}());
exports.ProductGlobalStatsComponent = ProductGlobalStatsComponent;

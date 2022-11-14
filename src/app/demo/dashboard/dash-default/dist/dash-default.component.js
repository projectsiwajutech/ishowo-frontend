"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashDefaultComponent = void 0;
var core_1 = require("@angular/core");
var support_chart_data_1_1 = require("./chart/support-chart-data-1");
var support_chart_data_2_1 = require("./chart/support-chart-data-2");
var seo_chart_1_1 = require("./chart/seo-chart-1");
var seo_chart_2_1 = require("./chart/seo-chart-2");
var seo_chart_3_1 = require("./chart/seo-chart-3");
var power_card_chart_1_1 = require("./chart/power-card-chart-1");
var power_card_chart_2_1 = require("./chart/power-card-chart-2");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var globalreport_1 = require("src/app/shared/models/stats/globalreport");
var measuretype_1 = require("src/app/shared/models/measuretype/measuretype");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var DashDefaultComponent = /** @class */ (function () {
    function DashDefaultComponent(statsService, stockLimitService, productService, measureTypeService, profilService, saletargetService, locStorService, libraryService) {
        this.statsService = statsService;
        this.stockLimitService = stockLimitService;
        this.productService = productService;
        this.measureTypeService = measureTypeService;
        this.profilService = profilService;
        this.saletargetService = saletargetService;
        this.locStorService = locStorService;
        this.libraryService = libraryService;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.parame = new ProductParam_1.ProductParam();
        this.isLoading = false;
        this.isLoadingOne = false;
        this.noDataOne = true;
        this.noData = true;
        this.page = 1;
        this.pageSize = 30;
        //report var
        this.report = new globalreport_1.GlobalReport();
        this.isLoadingStats = false;
        this.param = new PeriodParam_1.PeriodParam();
        this.is_part_visible = true;
        this.title = "Statistiques globales";
        this.underStockList = [];
        this.saleTargetList = [];
        this.supportChartData1 = support_chart_data_1_1.SupportChartData1.supportChartData;
        this.supportChartData2 = support_chart_data_2_1.SupportChartData2.supportChartData;
        this.seoChartData1 = seo_chart_1_1.SeoChart1.seoChartData;
        this.seoChartData2 = seo_chart_2_1.SeoChart2.seoChartData;
        this.seoChartData3 = seo_chart_3_1.SeoChart3.seoChartData;
        this.powerCardChartData1 = power_card_chart_1_1.PowerCardChart1.powerCardChartData;
        this.powerCardChartData2 = power_card_chart_2_1.PowerCardChart2.powerCardChartData;
        this.saveGroup();
    }
    DashDefaultComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getCurrentStats();
        this.getMeasureTypes();
    };
    DashDefaultComponent.prototype.saveGroup = function () {
        var _this = this;
        this.user = this.locStorService.getUser();
        this.profilService.getGroupRoles(this.user.group)
            .then(function (result) {
            _this.locStorService.saveGroup(result);
        }, function (error) {
            if (error.status === 400) {
                _this.libraryService.onError(error._body, 2000, 'top-start');
                return;
            }
            else {
                _this.libraryService.onError('Une erreur est survenue lors de la connexion', 2000, 'top-start');
                return;
            }
        });
    };
    //create object
    DashDefaultComponent.prototype.getCurrentStats = function () {
        var _this = this;
        this.isLoadingStats = true;
        this.statsService.getCurrentStats(this.user)
            .then(function (result) {
            _this.isLoadingStats = false;
            _this.report = result;
            if (_this.report === null)
                _this.report = new globalreport_1.GlobalReport();
        }, function (error) {
            _this.isLoadingStats = false;
        });
    }; //fin getCurrentStats
    //show by period stats
    DashDefaultComponent.prototype.getStatsByPeriod = function (form) {
        var _this = this;
        this.param.startDate = form.dateStart;
        this.param.endDate = form.dateEnd;
        this.isLoadingStats = true;
        this.statsService.getPeriodGlobalStats(this.param)
            .then(function (result) {
            _this.isLoadingStats = false;
            _this.report = result;
            if (_this.report === null)
                _this.report = new globalreport_1.GlobalReport();
        }, function (error) {
            _this.isLoadingStats = false;
        });
    }; //fin getStatsByPeriod
    //get product name
    DashDefaultComponent.prototype.getProductName = function (obj) {
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
    }; //fin getProdName
    //get list of stock limit
    DashDefaultComponent.prototype.getUnderStockProdList = function () {
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
    //search list of products stock view
    DashDefaultComponent.prototype.searchStockView = function () {
        var _this = this;
        this.isLoading = true;
        this.underStockList = [];
        var prodObj = { product_name: this.parame.product, product_code: this.parame.codebarre, id_profile: 0 };
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
            console.log(_this.underStockList);
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchStockView
    //get list of saletarget list
    DashDefaultComponent.prototype.getSaleTargetList = function () {
        var _this = this;
        this.isLoadingOne = true;
        this.saleTargetList = [];
        this.saletargetService.getSaleTargetList(this.user)
            .then(function (saletargetlist) {
            _this.isLoadingOne = false;
            if (saletargetlist.length === 0) {
                _this.noDataOne = true;
            }
            else {
                _this.noDataOne = false;
            }
            _this.saleTargetList = saletargetlist;
        }, function (error) {
            _this.isLoadingOne = false;
        });
    }; //fin getSaleTargetList
    //get list of measure types
    DashDefaultComponent.prototype.getMeasureTypes = function () {
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
    //get product measure type
    DashDefaultComponent.prototype.getProductMeasureType = function (obj) {
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
    DashDefaultComponent.prototype.getProductQA = function (obj) {
        if (obj !== null && obj !== undefined) {
            return obj.quantity;
        }
        else {
            return 0;
        }
    }; //fin getProdQA
    DashDefaultComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    DashDefaultComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
    DashDefaultComponent.prototype.getPeriodLib = function () {
        var periodLib = "du " + this.param.startDate + " au  " + this.param.endDate;
        return periodLib;
    }; //fin getPeriodLib
    __decorate([
        core_1.Input()
    ], DashDefaultComponent.prototype, "is_part_visible");
    __decorate([
        core_1.Input()
    ], DashDefaultComponent.prototype, "title");
    DashDefaultComponent = __decorate([
        core_1.Component({
            selector: 'app-dash-default',
            templateUrl: './dash-default.component.html',
            styleUrls: ['./dash-default.component.scss']
        })
    ], DashDefaultComponent);
    return DashDefaultComponent;
}());
exports.DashDefaultComponent = DashDefaultComponent;

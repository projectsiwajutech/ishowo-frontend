"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GeneralStatsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var globalreport_1 = require("src/app/shared/models/stats/globalreport");
var GeneralStatsComponent = /** @class */ (function () {
    function GeneralStatsComponent(statsService, locStorService, route) {
        this.statsService = statsService;
        this.locStorService = locStorService;
        this.route = route;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        //report var
        this.report = new globalreport_1.GlobalReport();
        this.isLoadingStats = false;
        this.param = new PeriodParam_1.PeriodParam();
        this.is_part_visible = true;
        this.title = "Statistiques globales";
    }
    GeneralStatsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getCurrentStats();
    };
    //create object
    GeneralStatsComponent.prototype.getCurrentStats = function () {
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
    GeneralStatsComponent.prototype.getStatsByPeriod = function (form) {
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
    GeneralStatsComponent.prototype.getProductName = function (obj) {
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
    //get product measure type
    GeneralStatsComponent.prototype.getProductMeasureType = function (obj) {
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
    GeneralStatsComponent.prototype.getProductQA = function (obj) {
        if (obj !== null && obj !== undefined) {
            return obj.quantity;
        }
        else {
            return 0;
        }
    }; //fin getProdQA
    GeneralStatsComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    GeneralStatsComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
    GeneralStatsComponent.prototype.getPeriodLib = function () {
        var periodLib = "du " + this.param.startDate + " au  " + this.param.endDate;
        return periodLib;
    }; //fin getPeriodLib
    __decorate([
        core_1.Input()
    ], GeneralStatsComponent.prototype, "is_part_visible");
    __decorate([
        core_1.Input()
    ], GeneralStatsComponent.prototype, "title");
    GeneralStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-general-stats',
            templateUrl: './general-stats.component.html',
            styleUrls: ['./general-stats.component.scss']
        })
    ], GeneralStatsComponent);
    return GeneralStatsComponent;
}());
exports.GeneralStatsComponent = GeneralStatsComponent;

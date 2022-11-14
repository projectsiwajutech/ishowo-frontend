"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersSalesStatsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var CustomersSalesStatsComponent = /** @class */ (function () {
    function CustomersSalesStatsComponent(statsService, locStorService, route, libraryService) {
        this.statsService = statsService;
        this.locStorService = locStorService;
        this.route = route;
        this.libraryService = libraryService;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.userReports = [];
        this.param = new PeriodParam_1.PeriodParam();
        this.isCreateVisible = false;
        this.isLoading = false;
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    CustomersSalesStatsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getReports();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of reports
    CustomersSalesStatsComponent.prototype.getReports = function () {
        var _this = this;
        this.isLoading = true;
        this.userReports = [];
        this.statsService.getSalesByCustomersStats(this.param)
            .then(function (reports) {
            _this.isLoading = false;
            if (reports.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.userReports = reports;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getReports
    //On Change Date1
    CustomersSalesStatsComponent.prototype.getSelectedDate1 = function (dateStart) {
        var format = new Date(dateStart);
        this.param.startDate = format;
    }; // fin 
    //On Change Date2
    CustomersSalesStatsComponent.prototype.getSelectedDate2 = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.param.endDate = format;
    }; //On Change Date2
    //track by
    CustomersSalesStatsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //paginate on page change
    CustomersSalesStatsComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    CustomersSalesStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-customers-sales-stats',
            templateUrl: './customers-sales-stats.component.html',
            styleUrls: ['./customers-sales-stats.component.scss']
        })
    ], CustomersSalesStatsComponent);
    return CustomersSalesStatsComponent;
}());
exports.CustomersSalesStatsComponent = CustomersSalesStatsComponent;

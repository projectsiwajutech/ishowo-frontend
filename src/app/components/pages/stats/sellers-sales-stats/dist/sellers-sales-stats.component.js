"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SellersSalesStatsComponent = void 0;
var core_1 = require("@angular/core");
var chart_data_1 = require("src/app/demo/pages/core-chart/crt-apex/chart/chart-data");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var SellersSalesStatsComponent = /** @class */ (function () {
    function SellersSalesStatsComponent(statsService, locStorService, route, libraryService) {
        this.statsService = statsService;
        this.locStorService = locStorService;
        this.route = route;
        this.libraryService = libraryService;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.chartDB = chart_data_1.ChartDB;
        this.userReports = [];
        this.param = new PeriodParam_1.PeriodParam();
        //CHART DATA
        this.labels = [];
        this.series = [];
        this.colors = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
        this.chartConfig = {
            chart: {
                height: 320,
                type: 'pie'
            },
            labels: this.labels,
            series: this.series,
            colors: this.colors,
            legend: {
                show: true,
                position: 'bottom'
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false
                }
            },
            responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
        };
    }
    ;
    SellersSalesStatsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getReports();
    };
    //get list of reports
    SellersSalesStatsComponent.prototype.getReports = function () {
        var _this = this;
        this.Clear = false;
        this.isLoading = true;
        this.userReports = [];
        this.statsService.getSalesBySellersStats(this.param)
            .then(function (reports) {
            _this.isLoading = false;
            if (reports.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.labels.splice(0);
            _this.series.splice(0);
            _this.colors.splice(0);
            reports.forEach(function (element) {
                _this.labels.push(element.userName);
                _this.series.push(element.pourcentage);
                _this.colors.push(_this.getColor());
            });
            _this.Clear = true;
            _this.userReports = reports;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getReports
    //get CA
    SellersSalesStatsComponent.prototype.getCA = function () {
        this.totalCA = this.userReports
            .map(function (p) { return p.totalSell; })
            .reduce(function (sum, current) { return sum + current; });
        return this.totalCA;
    };
    //fin get CA
    //getColor
    SellersSalesStatsComponent.prototype.getColor = function () { return "#" + Math.random().toString(16).slice(2, 8); };
    ;
    //fin getColor
    //On Change Date1
    SellersSalesStatsComponent.prototype.getSelectedDate1 = function (dateStart) {
        var format = new Date(dateStart);
        this.param.startDate = format;
    }; // fin 
    //On Change Date2
    SellersSalesStatsComponent.prototype.getSelectedDate2 = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.param.endDate = format;
    }; //On Change Date2
    __decorate([
        core_1.Input()
    ], SellersSalesStatsComponent.prototype, "chartConfig");
    SellersSalesStatsComponent = __decorate([
        core_1.Component({
            selector: 'app-sellers-sales-stats',
            templateUrl: './sellers-sales-stats.component.html',
            styleUrls: ['./sellers-sales-stats.component.scss']
        })
    ], SellersSalesStatsComponent);
    return SellersSalesStatsComponent;
}());
exports.SellersSalesStatsComponent = SellersSalesStatsComponent;

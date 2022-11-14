"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersSalesStatsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var customers_sales_stats_routing_module_1 = require("./customers-sales-stats-routing.module");
var customers_sales_stats_component_1 = require("./customers-sales-stats.component");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var CustomersSalesStatsModule = /** @class */ (function () {
    function CustomersSalesStatsModule() {
    }
    CustomersSalesStatsModule = __decorate([
        core_1.NgModule({
            declarations: [customers_sales_stats_component_1.CustomersSalesStatsComponent],
            imports: [
                common_1.CommonModule,
                customers_sales_stats_routing_module_1.CustomersSalesStatsRoutingModule,
                shared_module_1.SharedModule,
                angular_datatables_1.DataTablesModule
            ]
        })
    ], CustomersSalesStatsModule);
    return CustomersSalesStatsModule;
}());
exports.CustomersSalesStatsModule = CustomersSalesStatsModule;

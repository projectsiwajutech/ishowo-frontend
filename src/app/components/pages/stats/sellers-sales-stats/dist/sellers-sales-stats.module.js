"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SellersSalesStatsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var sellers_sales_stats_component_1 = require("./sellers-sales-stats.component");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var sellers_sales_stats_routing_module_1 = require("./sellers-sales-stats-routing.module");
var SellersSalesStatsModule = /** @class */ (function () {
    function SellersSalesStatsModule() {
    }
    SellersSalesStatsModule = __decorate([
        core_1.NgModule({
            declarations: [sellers_sales_stats_component_1.SellersSalesStatsComponent],
            imports: [
                common_1.CommonModule,
                sellers_sales_stats_routing_module_1.SellersSalesStatsRoutingModule,
                shared_module_1.SharedModule,
                angular_datatables_1.DataTablesModule
            ]
        })
    ], SellersSalesStatsModule);
    return SellersSalesStatsModule;
}());
exports.SellersSalesStatsModule = SellersSalesStatsModule;

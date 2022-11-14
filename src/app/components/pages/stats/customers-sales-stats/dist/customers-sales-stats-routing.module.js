"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersSalesStatsRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var customers_sales_stats_component_1 = require("./customers-sales-stats.component");
var routes = [
    {
        path: '',
        component: customers_sales_stats_component_1.CustomersSalesStatsComponent
    }
];
var CustomersSalesStatsRoutingModule = /** @class */ (function () {
    function CustomersSalesStatsRoutingModule() {
    }
    CustomersSalesStatsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CustomersSalesStatsRoutingModule);
    return CustomersSalesStatsRoutingModule;
}());
exports.CustomersSalesStatsRoutingModule = CustomersSalesStatsRoutingModule;

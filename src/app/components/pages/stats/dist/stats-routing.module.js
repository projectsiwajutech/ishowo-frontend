"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StatsRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_st1_guard_1 = require("../guards/ST1/guard-st1.guard");
var guard_st2_guard_1 = require("../guards/ST2/guard-st2.guard");
var guard_st3_guard_1 = require("../guards/ST3/guard-st3.guard");
var guard_st4_guard_1 = require("../guards/ST4/guard-st4.guard");
var guard_st5_guard_1 = require("../guards/ST5/guard-st5.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'globalStats',
                canLoad: [guard_st1_guard_1.GuardST1Guard],
                canActivate: [guard_st1_guard_1.GuardST1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./general-stats/general-stats.module'); }).then(function (module) { return module.GeneralStatsModule; }); }
            },
            {
                path: 'productStats',
                canLoad: [guard_st2_guard_1.GuardST2Guard],
                canActivate: [guard_st2_guard_1.GuardST2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./product-global-stats/product-global-stats.module'); }).then(function (module) { return module.ProductGlobalStatsModule; }); }
            },
            {
                path: 'productSoldStats',
                canLoad: [guard_st3_guard_1.GuardST3Guard],
                canActivate: [guard_st3_guard_1.GuardST3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./product-sold-stats/product-sold-stats.module'); }).then(function (module) { return module.ProductSoldStatsModule; }); }
            },
            {
                path: 'sellersStats',
                canLoad: [guard_st4_guard_1.GuardST4Guard],
                canActivate: [guard_st4_guard_1.GuardST4Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./sellers-sales-stats/sellers-sales-stats.module'); }).then(function (module) { return module.SellersSalesStatsModule; }); }
            },
            {
                path: 'customersStats',
                canLoad: [guard_st5_guard_1.GuardST5Guard],
                canActivate: [guard_st5_guard_1.GuardST5Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./customers-sales-stats/customers-sales-stats.module'); }).then(function (module) { return module.CustomersSalesStatsModule; }); }
            }
        ]
    }
];
var StatsRoutingModule = /** @class */ (function () {
    function StatsRoutingModule() {
    }
    StatsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], StatsRoutingModule);
    return StatsRoutingModule;
}());
exports.StatsRoutingModule = StatsRoutingModule;

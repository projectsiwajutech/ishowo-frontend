"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StocksRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_sm_guard_1 = require("../guards/SM/guard-sm.guard");
var guard_sm1_guard_1 = require("../guards/SM1/guard-sm1.guard");
var guard_sm2_guard_1 = require("../guards/SM2/guard-sm2.guard");
var guard_sm3_guard_1 = require("../guards/SM3/guard-sm3.guard");
var guard_sm4_guard_1 = require("../guards/SM4/guard-sm4.guard");
var guard_sm5_guard_1 = require("../guards/SM5/guard-sm5.guard");
var guard_sm6_guard_1 = require("../guards/SM6/guard-sm6.guard");
var guard_sm7_guard_1 = require("../guards/SM7/guard-sm7.guard");
var guard_sm8_guard_1 = require("../guards/SM8/guard-sm8.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'main',
                canLoad: [guard_sm_guard_1.GuardSMGuard],
                canActivate: [guard_sm_guard_1.GuardSMGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./main/main.module'); }).then(function (module) { return module.MainModule; }); }
            },
            {
                path: 'listnew',
                canLoad: [guard_sm1_guard_1.GuardSM1Guard],
                canActivate: [guard_sm1_guard_1.GuardSM1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./newcommande/list/newcommande-list.module'); }).then(function (module) { return module.NewCommandeListModule; }); }
            },
            {
                path: 'listcreate',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./newcommande/create/commande-create.module'); }).then(function (module) { return module.CommandeCreateModule; }); }
            },
            {
                path: 'orderslist',
                canLoad: [guard_sm2_guard_1.GuardSM2Guard],
                canActivate: [guard_sm2_guard_1.GuardSM2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./searchcommande/list/commande-list.module'); }).then(function (module) { return module.CommandesListModule; }); }
            },
            {
                path: 'ordersdetail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./searchcommande/details/commande-details.module'); }).then(function (module) { return module.CommandeDetailsModule; }); }
            },
            {
                path: 'stockProducts',
                canLoad: [guard_sm3_guard_1.GuardSM3Guard],
                canActivate: [guard_sm3_guard_1.GuardSM3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./productStocks/list/product-stock-list.module'); }).then(function (module) { return module.ProductsInStockModule; }); }
            },
            {
                path: 'barresCodes',
                canLoad: [guard_sm4_guard_1.GuardSM4Guard],
                canActivate: [guard_sm4_guard_1.GuardSM4Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./gen-barcodes/generate-barcode.module'); }).then(function (module) { return module.GenerateBareCodeModule; }); }
            },
            {
                path: 'printbarresCodes',
                canLoad: [guard_sm5_guard_1.GuardSM5Guard],
                canActivate: [guard_sm5_guard_1.GuardSM5Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./print-barcodes/print-barcode.module'); }).then(function (module) { return module.PrintBareCodeModule; }); }
            },
            {
                path: 'seuilStocks',
                canLoad: [guard_sm7_guard_1.GuardSM7Guard],
                canActivate: [guard_sm7_guard_1.GuardSM7Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./seuilStocks/list/seuil-stock-list.module'); }).then(function (module) { return module.SeuilStockModule; }); }
            },
            {
                path: 'hsProducts',
                canLoad: [guard_sm8_guard_1.GuardSM8Guard],
                canActivate: [guard_sm8_guard_1.GuardSM8Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./horsSeuilProducts/list/hs-products-list.module'); }).then(function (module) { return module.HsProductsModule; }); }
            },
            {
                path: 'transStocks',
                canLoad: [guard_sm6_guard_1.GuardSM6Guard],
                canActivate: [guard_sm6_guard_1.GuardSM6Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./trans-stocks/list/tran-stocks-list.module'); }).then(function (module) { return module.TranStocksModule; }); }
            }
        ]
    }
];
var StocksRoutingModule = /** @class */ (function () {
    function StocksRoutingModule() {
    }
    StocksRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], StocksRoutingModule);
    return StocksRoutingModule;
}());
exports.StocksRoutingModule = StocksRoutingModule;

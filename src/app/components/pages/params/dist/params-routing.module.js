"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EcommerceRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_cli_guard_1 = require("../guards/CLI/guard-cli.guard");
var guard_f1_guard_1 = require("../guards/F1/guard-f1.guard");
var guard_p1_guard_1 = require("../guards/P1/guard-p1.guard");
var guard_p2_guard_1 = require("../guards/P2/guard-p2.guard");
var guard_p3_guard_1 = require("../guards/P3/guard-p3.guard");
var guard_p4_guard_1 = require("../guards/P4/guard-p4.guard");
var guard_p5_guard_1 = require("../guards/P5/guard-p5.guard");
var guard_p6_guard_1 = require("../guards/P6/guard-p6.guard");
var guard_p7_guard_1 = require("../guards/P7/guard-p7.guard");
var guard_p8_guard_1 = require("../guards/P8/guard-p8.guard");
var guard_p9_guard_1 = require("../guards/P9/guard-p9.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'agencies',
                canLoad: [guard_p1_guard_1.GuardP1Guard],
                canActivate: [guard_f1_guard_1.GuardF1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./agencies/list/agencies.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'categories',
                canLoad: [guard_p2_guard_1.GuardP2Guard],
                canActivate: [guard_p2_guard_1.GuardP2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./categories/list/categories.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'suppliers',
                canLoad: [guard_p5_guard_1.GuardP5Guard],
                canActivate: [guard_p5_guard_1.GuardP5Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./suppliers/list/suppliers.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'logs',
                canLoad: [guard_p8_guard_1.GuardP8Guard],
                canActivate: [guard_p8_guard_1.GuardP8Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./logs/list/logs.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'compartments',
                canLoad: [guard_p3_guard_1.GuardP3Guard],
                canActivate: [guard_p3_guard_1.GuardP3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./compartments/list/compartments.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'saletargets',
                canLoad: [guard_p6_guard_1.GuardP6Guard],
                canActivate: [guard_p6_guard_1.GuardP6Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./saletargets/list/saletargets.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'measuretypes',
                canLoad: [guard_p4_guard_1.GuardP4Guard],
                canActivate: [guard_p4_guard_1.GuardP4Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./measuretypes/list/measuretypes.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'products',
                canLoad: [guard_p7_guard_1.GuardP7Guard],
                canActivate: [guard_p7_guard_1.GuardP7Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./products/list/products.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'customers',
                canLoad: [guard_cli_guard_1.GuardCliGuard],
                canActivate: [guard_cli_guard_1.GuardCliGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./customers/list/customers.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'paramMecef',
                canLoad: [guard_p9_guard_1.GuardP9Guard],
                canActivate: [guard_p9_guard_1.GuardP9Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./mecef/view/param-mecef.module'); }).then(function (module) { return module.ParamMecefModule; }); }
            },
        ]
    }
];
var EcommerceRoutingModule = /** @class */ (function () {
    function EcommerceRoutingModule() {
    }
    EcommerceRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], EcommerceRoutingModule);
    return EcommerceRoutingModule;
}());
exports.EcommerceRoutingModule = EcommerceRoutingModule;

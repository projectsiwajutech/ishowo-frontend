"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FinancesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_f1_guard_1 = require("../guards/F1/guard-f1.guard");
var guard_f2_guard_1 = require("../guards/F2/guard-f2.guard");
var guard_f3_guard_1 = require("../guards/F3/guard-f3.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'banks',
                canLoad: [guard_f1_guard_1.GuardF1Guard],
                canActivate: [guard_f1_guard_1.GuardF1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./banks/list/banks.module'); }).then(function (module) { return module.BanksModule; }); }
            },
            {
                path: 'vaccounts',
                canLoad: [guard_f2_guard_1.GuardF2Guard],
                canActivate: [guard_f2_guard_1.GuardF2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./virtualaccounts/list/vaccounts.module'); }).then(function (module) { return module.VaccountsModule; }); }
            },
            {
                path: 'operations',
                canLoad: [guard_f3_guard_1.GuardF3Guard],
                canActivate: [guard_f3_guard_1.GuardF3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./operations/list/operations.module'); }).then(function (module) { return module.OperationsModule; }); }
            }
        ]
    }
];
var FinancesRoutingModule = /** @class */ (function () {
    function FinancesRoutingModule() {
    }
    FinancesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], FinancesRoutingModule);
    return FinancesRoutingModule;
}());
exports.FinancesRoutingModule = FinancesRoutingModule;

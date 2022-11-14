"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VentesRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var guard_vm_guard_1 = require("../guards/VM/guard-vm.guard");
var guard_vm1_guard_1 = require("../guards/VM1/guard-vm1.guard");
var guard_vm2_guard_1 = require("../guards/VM2/guard-vm2.guard");
var guard_vm3_guard_1 = require("../guards/VM3/guard-vm3.guard");
var guard_vm4_guard_1 = require("../guards/VM4/guard-vm4.guard");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'main',
                canLoad: [guard_vm_guard_1.GuardVMGuard],
                canActivate: [guard_vm_guard_1.GuardVMGuard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./main/main-sales.module'); }).then(function (module) { return module.MainSalesModule; }); }
            },
            {
                path: 'createsale',
                canLoad: [guard_vm1_guard_1.GuardVM1Guard],
                canActivate: [guard_vm1_guard_1.GuardVM1Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./create/sale-new.module'); }).then(function (module) { return module.SaleNewModule; }); }
            },
            {
                path: 'listsales',
                canLoad: [guard_vm3_guard_1.GuardVM3Guard],
                canActivate: [guard_vm3_guard_1.GuardVM3Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./listSale/list/list-sales.module'); }).then(function (module) { return module.ListSalesModule; }); }
            },
            {
                path: 'salesdetail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./listSale/details/sale-details.module'); }).then(function (module) { return module.SaleDetailsModule; }); }
            },
            {
                path: 'listdevis',
                canLoad: [guard_vm4_guard_1.GuardVM4Guard],
                canActivate: [guard_vm4_guard_1.GuardVM4Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./listDevis/list-devis.module'); }).then(function (module) { return module.ListDevisModule; }); }
            },
            {
                path: 'partialsale',
                canLoad: [guard_vm2_guard_1.GuardVM2Guard],
                canActivate: [guard_vm2_guard_1.GuardVM2Guard],
                loadChildren: function () { return Promise.resolve().then(function () { return require('./partial-sale-create/partial-sale-create.module'); }).then(function (module) { return module.PartialSaleModule; }); }
            }
        ]
    }
];
var VentesRoutingModule = /** @class */ (function () {
    function VentesRoutingModule() {
    }
    VentesRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], VentesRoutingModule);
    return VentesRoutingModule;
}());
exports.VentesRoutingModule = VentesRoutingModule;

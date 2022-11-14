"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'main',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./dash-default/dash-default.module'); }).then(function (module) { return module.DashDefaultModule; }); }
            },
            {
                path: 'sale',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./dash-sale/dash-sale.module'); }).then(function (module) { return module.DashSaleModule; }); }
            },
            {
                path: 'crm',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./dash-crm/dash-crm.module'); }).then(function (module) { return module.DashCrmModule; }); }
            },
            {
                path: 'analytics',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./dash-analytics/dash-analytics.module'); }).then(function (module) { return module.DashAnalyticsModule; }); }
            },
            {
                path: 'project',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./dash-project/dash-project.module'); }).then(function (module) { return module.DashProjectModule; }); }
            }
        ]
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
exports.DashboardRoutingModule = DashboardRoutingModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_component_1 = require("./theme/layout/admin/admin.component");
var auth_component_1 = require("./theme/layout/auth/auth.component");
var routes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        children: [
            {
                path: '',
                redirectTo: '/auth/connection',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./demo/dashboard/dashboard.module'); }).then(function (module) { return module.DashboardModule; }); }
            },
            {
                path: 'stocks',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/stock/stocks.module'); }).then(function (module) { return module.StocksModule; }); }
            },
            {
                path: 'ventes',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/ventes/ventes.module'); }).then(function (module) { return module.VentesModule; }); }
            },
            {
                path: 'parametres',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/params/params.module'); }).then(function (module) { return module.ParamsModule; }); }
            },
            {
                path: 'securite',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/security/security.module'); }).then(function (module) { return module.SecurityModule; }); }
            },
            {
                path: 'finances',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/finances/finances.module'); }).then(function (module) { return module.FinancesModule; }); }
            },
            {
                path: 'statistiques',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/stats/stats.module'); }).then(function (module) { return module.StatsModule; }); }
            },
        ]
    },
    {
        path: '',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: 'auth',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/pages/authentication/authentication.module'); }).then(function (module) { return module.AuthenticationModule; }); }
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

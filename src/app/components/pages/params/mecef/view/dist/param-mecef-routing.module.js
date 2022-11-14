"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamMecefRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var param_mecef_component_1 = require("./param-mecef.component");
var routes = [
    {
        path: '',
        component: param_mecef_component_1.ParamMecefComponent
    }
];
var ParamMecefRoutingModule = /** @class */ (function () {
    function ParamMecefRoutingModule() {
    }
    ParamMecefRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ParamMecefRoutingModule);
    return ParamMecefRoutingModule;
}());
exports.ParamMecefRoutingModule = ParamMecefRoutingModule;

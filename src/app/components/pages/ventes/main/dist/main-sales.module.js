"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainSalesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var main_sales_component_1 = require("./main-sales.component");
var main_sales_routing_module_1 = require("./main-sales-routing.module");
var MainSalesModule = /** @class */ (function () {
    function MainSalesModule() {
    }
    MainSalesModule = __decorate([
        core_1.NgModule({
            declarations: [main_sales_component_1.MainSalesComponent],
            imports: [
                common_1.CommonModule,
                main_sales_routing_module_1.MainSalesRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], MainSalesModule);
    return MainSalesModule;
}());
exports.MainSalesModule = MainSalesModule;

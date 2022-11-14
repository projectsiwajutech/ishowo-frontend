"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HsProductsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var hs_products_list_component_1 = require("./hs-products-list.component");
var hs_products_list_routing_module_1 = require("./hs-products-list-routing.module");
var HsProductsModule = /** @class */ (function () {
    function HsProductsModule() {
    }
    HsProductsModule = __decorate([
        core_1.NgModule({
            declarations: [hs_products_list_component_1.HsProductsListComponent],
            imports: [
                common_1.CommonModule,
                hs_products_list_routing_module_1.HsProductsRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], HsProductsModule);
    return HsProductsModule;
}());
exports.HsProductsModule = HsProductsModule;

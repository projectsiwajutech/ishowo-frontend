"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SeuilStockModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var seuil_stock_list_component_1 = require("./seuil-stock-list.component");
var seuil_stock_list_routing_module_1 = require("./seuil-stock-list-routing.module");
var SeuilStockModule = /** @class */ (function () {
    function SeuilStockModule() {
    }
    SeuilStockModule = __decorate([
        core_1.NgModule({
            declarations: [seuil_stock_list_component_1.SeuilStockListComponent],
            imports: [
                common_1.CommonModule,
                seuil_stock_list_routing_module_1.SeuilStockRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], SeuilStockModule);
    return SeuilStockModule;
}());
exports.SeuilStockModule = SeuilStockModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranStocksModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var tran_stocks_list_routing_module_1 = require("./tran-stocks-list-routing.module");
var tran_stocks_list_component_1 = require("./tran-stocks-list.component");
var TranStocksModule = /** @class */ (function () {
    function TranStocksModule() {
    }
    TranStocksModule = __decorate([
        core_1.NgModule({
            declarations: [tran_stocks_list_component_1.TranStocksListComponent],
            imports: [
                common_1.CommonModule,
                tran_stocks_list_routing_module_1.TranStocksRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], TranStocksModule);
    return TranStocksModule;
}());
exports.TranStocksModule = TranStocksModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BanksModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var banks_routing_module_1 = require("./banks-routing.module");
var banks_component_1 = require("./banks.component");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var BanksModule = /** @class */ (function () {
    function BanksModule() {
    }
    BanksModule = __decorate([
        core_1.NgModule({
            declarations: [banks_component_1.BanksComponent],
            imports: [
                common_1.CommonModule,
                banks_routing_module_1.BanksRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], BanksModule);
    return BanksModule;
}());
exports.BanksModule = BanksModule;

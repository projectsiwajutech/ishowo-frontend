"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VaccountsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var vaccounts_routing_module_1 = require("./vaccounts-routing.module");
var vaccounts_component_1 = require("./vaccounts.component");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var VaccountsModule = /** @class */ (function () {
    function VaccountsModule() {
    }
    VaccountsModule = __decorate([
        core_1.NgModule({
            declarations: [vaccounts_component_1.VaccountsComponent],
            imports: [
                common_1.CommonModule,
                vaccounts_routing_module_1.VaccountsRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], VaccountsModule);
    return VaccountsModule;
}());
exports.VaccountsModule = VaccountsModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var suppliers_routing_module_1 = require("./suppliers-routing.module");
var suppliers_component_1 = require("./suppliers.component");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var ParamsModule = /** @class */ (function () {
    function ParamsModule() {
    }
    ParamsModule = __decorate([
        core_1.NgModule({
            declarations: [suppliers_component_1.SuppliersComponent],
            imports: [
                common_1.CommonModule,
                suppliers_routing_module_1.EcommProductRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], ParamsModule);
    return ParamsModule;
}());
exports.ParamsModule = ParamsModule;

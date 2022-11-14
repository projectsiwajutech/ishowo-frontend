"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OperationsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var operations_routing_module_1 = require("./operations-routing.module");
var operations_component_1 = require("./operations.component");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var OperationsModule = /** @class */ (function () {
    function OperationsModule() {
    }
    OperationsModule = __decorate([
        core_1.NgModule({
            declarations: [operations_component_1.OperationsComponent],
            imports: [
                common_1.CommonModule,
                operations_routing_module_1.OperationsRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], OperationsModule);
    return OperationsModule;
}());
exports.OperationsModule = OperationsModule;

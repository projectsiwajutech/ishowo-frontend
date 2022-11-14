"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamMecefModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var param_mecef_routing_module_1 = require("./param-mecef-routing.module");
var param_mecef_component_1 = require("./param-mecef.component");
var ParamMecefModule = /** @class */ (function () {
    function ParamMecefModule() {
    }
    ParamMecefModule = __decorate([
        core_1.NgModule({
            declarations: [param_mecef_component_1.ParamMecefComponent],
            imports: [
                common_1.CommonModule,
                param_mecef_routing_module_1.ParamMecefRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], ParamMecefModule);
    return ParamMecefModule;
}());
exports.ParamMecefModule = ParamMecefModule;

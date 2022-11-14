"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HdCustomerModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var hd_customer_routing_module_1 = require("./hd-customer-routing.module");
var hd_customer_component_1 = require("./hd-customer.component");
var shared_module_1 = require("../../../../theme/shared/shared.module");
var angular2_tinymce_1 = require("angular2-tinymce");
var HdCustomerModule = /** @class */ (function () {
    function HdCustomerModule() {
    }
    HdCustomerModule = __decorate([
        core_1.NgModule({
            declarations: [hd_customer_component_1.HdCustomerComponent],
            imports: [
                common_1.CommonModule,
                hd_customer_routing_module_1.HdCustomerRoutingModule,
                shared_module_1.SharedModule,
                angular2_tinymce_1.TinymceModule
            ]
        })
    ], HdCustomerModule);
    return HdCustomerModule;
}());
exports.HdCustomerModule = HdCustomerModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PartialSaleModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var partial_sale_create_routing_module_1 = require("./partial-sale-create-routing.module");
var ng_snotify_1 = require("ng-snotify");
var partial_sale_create_component_1 = require("./partial-sale-create.component");
var PartialSaleModule = /** @class */ (function () {
    function PartialSaleModule() {
    }
    PartialSaleModule = __decorate([
        core_1.NgModule({
            declarations: [partial_sale_create_component_1.PartialSaleCreateComponent],
            imports: [
                common_1.CommonModule,
                partial_sale_create_routing_module_1.PartialSaleRoutingModule,
                shared_module_1.SharedModule,
                ng_snotify_1.SnotifyModule
            ],
            providers: [{ provide: 'SnotifyToastConfig', useValue: ng_snotify_1.ToastDefaults }, ng_snotify_1.SnotifyService]
        })
    ], PartialSaleModule);
    return PartialSaleModule;
}());
exports.PartialSaleModule = PartialSaleModule;

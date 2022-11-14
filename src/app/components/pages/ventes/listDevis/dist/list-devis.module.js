"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListDevisModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var list_devis_component_1 = require("./list-devis.component");
var list_devis_routing_module_1 = require("./list-devis-routing.module");
var ListDevisModule = /** @class */ (function () {
    function ListDevisModule() {
    }
    ListDevisModule = __decorate([
        core_1.NgModule({
            declarations: [list_devis_component_1.ListDevisComponent],
            imports: [
                common_1.CommonModule,
                list_devis_routing_module_1.ListDevisRoutingModule,
                shared_module_1.SharedModule,
            ],
            providers: []
        })
    ], ListDevisModule);
    return ListDevisModule;
}());
exports.ListDevisModule = ListDevisModule;
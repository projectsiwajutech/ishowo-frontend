"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommandeDetailsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var commande_details_component_1 = require("./commande-details.component");
var commande_details_routing_module_1 = require("./commande-details-routing.module");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var CommandeDetailsModule = /** @class */ (function () {
    function CommandeDetailsModule() {
    }
    CommandeDetailsModule = __decorate([
        core_1.NgModule({
            declarations: [commande_details_component_1.CommandeDetailsComponent],
            imports: [
                common_1.CommonModule,
                commande_details_routing_module_1.CommandeDetailsRoutingModule,
                shared_module_1.SharedModule,
            ]
        })
    ], CommandeDetailsModule);
    return CommandeDetailsModule;
}());
exports.CommandeDetailsModule = CommandeDetailsModule;

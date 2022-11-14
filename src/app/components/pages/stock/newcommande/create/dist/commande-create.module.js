"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommandeCreateModule = void 0;
var ng_snotify_1 = require("ng-snotify");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var commande_routing_module_1 = require("./commande-routing.module");
var commande_create_component_1 = require("./commande-create.component");
var shared_module_1 = require("../../../../../theme/shared/shared.module");
var CommandeCreateModule = /** @class */ (function () {
    function CommandeCreateModule() {
    }
    CommandeCreateModule = __decorate([
        core_1.NgModule({
            declarations: [commande_create_component_1.CommandeCreateComponent],
            imports: [
                common_1.CommonModule,
                commande_routing_module_1.CommandeCreateRoutingModule,
                shared_module_1.SharedModule,
                ng_snotify_1.SnotifyModule
            ],
            providers: []
        })
    ], CommandeCreateModule);
    return CommandeCreateModule;
}());
exports.CommandeCreateModule = CommandeCreateModule;

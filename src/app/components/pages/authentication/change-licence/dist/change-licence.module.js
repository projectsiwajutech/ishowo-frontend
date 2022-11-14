"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangeLicenceModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var angular_archwizard_1 = require("angular-archwizard");
var angular2_text_mask_1 = require("angular2-text-mask");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var change_licence_component_1 = require("./change-licence.component");
var change_licence_routing_module_1 = require("./change-licence-routing.module");
var ChangeLicenceModule = /** @class */ (function () {
    function ChangeLicenceModule() {
    }
    ChangeLicenceModule = __decorate([
        core_1.NgModule({
            declarations: [change_licence_component_1.ChangeLicenceComponent],
            imports: [
                common_1.CommonModule,
                change_licence_routing_module_1.ChangeLicenceRoutingModule,
                shared_module_1.SharedModule,
                angular_archwizard_1.ArchwizardModule,
                angular2_text_mask_1.TextMaskModule,
                ng_bootstrap_1.NgbCollapseModule,
                ng_bootstrap_1.NgbDropdownModule,
                ng_bootstrap_1.NgbTooltipModule
            ]
        })
    ], ChangeLicenceModule);
    return ChangeLicenceModule;
}());
exports.ChangeLicenceModule = ChangeLicenceModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignInModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var signin_routing_module_1 = require("./signin-routing.module");
var basic_cards_routing_module_1 = require("src/app/demo/ui-elements/ui-basic/basic-cards/basic-cards-routing.module");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var signin_component_1 = require("./signin.component");
var SignInModule = /** @class */ (function () {
    function SignInModule() {
    }
    SignInModule = __decorate([
        core_1.NgModule({
            declarations: [signin_component_1.SigninComponent],
            imports: [
                common_1.CommonModule,
                signin_routing_module_1.SignInRoutingModule,
                forms_1.FormsModule,
                basic_cards_routing_module_1.BasicCardsRoutingModule,
                shared_module_1.SharedModule
            ]
        })
    ], SignInModule);
    return SignInModule;
}());
exports.SignInModule = SignInModule;

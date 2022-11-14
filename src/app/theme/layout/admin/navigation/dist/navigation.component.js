"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavigationComponent = void 0;
var core_1 = require("@angular/core");
var app_config_1 = require("../../../../app-config");
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent() {
        this.onNavMobCollapse = new core_1.EventEmitter();
        this.nextConfig = app_config_1.NextConfig.config;
        this.windowWidth = window.innerWidth;
    }
    NavigationComponent.prototype.ngOnInit = function () { };
    NavigationComponent.prototype.navMobCollapse = function () {
        if (this.windowWidth < 992) {
            this.onNavMobCollapse.emit();
        }
    };
    __decorate([
        core_1.Output()
    ], NavigationComponent.prototype, "onNavMobCollapse");
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'app-navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss']
        })
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;

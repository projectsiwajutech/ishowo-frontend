"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var app_config_1 = require("../../../app-config");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(zone, location, router) {
        this.zone = zone;
        this.location = location;
        this.router = router;
        this.nextConfig = app_config_1.NextConfig.config;
        var currentURL = this.location.path();
        var baseHerf = this.location['_baseHref'];
        if (baseHerf) {
            currentURL = baseHerf + this.location.path();
        }
        this.windowWidth = window.innerWidth;
        if ((currentURL === baseHerf + '/layout/collapse-menu'
            || currentURL === baseHerf + '/layout/box')
            && (this.windowWidth >= 992 && this.windowWidth <= 1024)) {
            this.nextConfig.collapseMenu = true;
        }
        this.navCollapsed = (this.windowWidth >= 992) ? this.nextConfig.collapseMenu : false;
        this.navCollapsedMob = false;
        this.getcurrentURL();
    }
    AdminComponent.prototype.ngOnInit = function () {
        if (this.windowWidth < 992) {
            this.nextConfig.layout = 'vertical';
            setTimeout(function () {
                document.querySelector('.pcoded-navbar').classList.add('menupos-static');
                document.querySelector('#nav-ps-next').style.maxHeight = '100%'; // 100% amit
            }, 500);
        }
        this.getcurrentURL();
    };
    AdminComponent.prototype.navMobClick = function () {
        var _this = this;
        if (this.windowWidth < 992) {
            if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
                this.navCollapsedMob = !this.navCollapsedMob;
                setTimeout(function () {
                    _this.navCollapsedMob = !_this.navCollapsedMob;
                }, 100);
            }
            else {
                this.navCollapsedMob = !this.navCollapsedMob;
            }
        }
    };
    //get currentURL
    AdminComponent.prototype.getcurrentURL = function () {
        var currentURL = this.location.path();
        if (currentURL === '/stocks/listnew') {
            this.removeCss = true;
        }
        else if (currentURL !== '/stocks/listnew') {
            this.removeCss = false;
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.scss']
        })
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;

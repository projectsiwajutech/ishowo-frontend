"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavContentComponent = void 0;
var core_1 = require("@angular/core");
var app_config_1 = require("../../../../../app-config");
var NavContentComponent = /** @class */ (function () {
    function NavContentComponent(nav, locStorService, zone, location) {
        this.nav = nav;
        this.locStorService = locStorService;
        this.zone = zone;
        this.location = location;
        this.onNavMobCollapse = new core_1.EventEmitter();
        this.nextConfig = app_config_1.NextConfig.config;
        this.windowWidth = window.innerWidth;
        this.navigation = this.nav.get();
        this.prevDisabled = 'disabled';
        this.nextDisabled = '';
        this.scrollWidth = 0;
        this.contentWidth = 0;
        this.isNavProfile = false;
    }
    NavContentComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        if (this.windowWidth < 992) {
            this.nextConfig['layout'] = 'vertical';
            setTimeout(function () {
                document.querySelector('.pcoded-navbar').classList.add('menupos-static');
                document.querySelector('#nav-ps-next').style.maxHeight = '100%';
            }, 500);
        }
    };
    NavContentComponent.prototype.ngAfterViewInit = function () {
        if (this.nextConfig['layout'] === 'horizontal') {
            this.contentWidth = this.navbarContent.nativeElement.clientWidth;
            this.wrapperWidth = this.navbarWrapper.nativeElement.clientWidth;
        }
    };
    NavContentComponent.prototype.scrollPlus = function () {
        this.scrollWidth = this.scrollWidth + (this.wrapperWidth - 80);
        if (this.scrollWidth > (this.contentWidth - this.wrapperWidth)) {
            this.scrollWidth = this.contentWidth - this.wrapperWidth + 80;
            this.nextDisabled = 'disabled';
        }
        this.prevDisabled = '';
        if (this.nextConfig.rtlLayout) {
            document.querySelector('#side-nav-horizontal').style.marginRight = '-' + this.scrollWidth + 'px';
        }
        else {
            document.querySelector('#side-nav-horizontal').style.marginLeft = '-' + this.scrollWidth + 'px';
        }
    };
    NavContentComponent.prototype.scrollMinus = function () {
        this.scrollWidth = this.scrollWidth - this.wrapperWidth;
        if (this.scrollWidth < 0) {
            this.scrollWidth = 0;
            this.prevDisabled = 'disabled';
        }
        this.nextDisabled = '';
        if (this.nextConfig.rtlLayout) {
            document.querySelector('#side-nav-horizontal').style.marginRight = '-' + this.scrollWidth + 'px';
        }
        else {
            document.querySelector('#side-nav-horizontal').style.marginLeft = '-' + this.scrollWidth + 'px';
        }
    };
    NavContentComponent.prototype.fireLeave = function () {
        var sections = document.querySelectorAll('.pcoded-hasmenu');
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active');
            sections[i].classList.remove('pcoded-trigger');
        }
        var current_url = this.location.path();
        if (this.location['_baseHref']) {
            current_url = this.location['_baseHref'] + this.location.path();
        }
        var link = "a.nav-link[ href='" + current_url + "' ]";
        var ele = document.querySelector(link);
        if (ele !== null && ele !== undefined) {
            var parent = ele.parentElement;
            var up_parent = parent.parentElement.parentElement;
            var last_parent = up_parent.parentElement;
            if (parent.classList.contains('pcoded-hasmenu')) {
                parent.classList.add('active');
            }
            else if (up_parent.classList.contains('pcoded-hasmenu')) {
                up_parent.classList.add('active');
            }
            else if (last_parent.classList.contains('pcoded-hasmenu')) {
                last_parent.classList.add('active');
            }
        }
    };
    NavContentComponent.prototype.navMob = function () {
        if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
            this.onNavMobCollapse.emit();
        }
    };
    NavContentComponent.prototype.fireOutClick = function () {
        var current_url = this.location.path();
        if (this.location['_baseHref']) {
            current_url = this.location['_baseHref'] + this.location.path();
        }
        var link = "a.nav-link[ href='" + current_url + "' ]";
        var ele = document.querySelector(link);
        if (ele !== null && ele !== undefined) {
            var parent = ele.parentElement;
            var up_parent = parent.parentElement.parentElement;
            var last_parent = up_parent.parentElement;
            if (parent.classList.contains('pcoded-hasmenu')) {
                if (this.nextConfig['layout'] === 'vertical') {
                    parent.classList.add('pcoded-trigger');
                }
                parent.classList.add('active');
            }
            else if (up_parent.classList.contains('pcoded-hasmenu')) {
                if (this.nextConfig['layout'] === 'vertical') {
                    up_parent.classList.add('pcoded-trigger');
                }
                up_parent.classList.add('active');
            }
            else if (last_parent.classList.contains('pcoded-hasmenu')) {
                if (this.nextConfig['layout'] === 'vertical') {
                    last_parent.classList.add('pcoded-trigger');
                }
                last_parent.classList.add('active');
            }
        }
    };
    __decorate([
        core_1.Output()
    ], NavContentComponent.prototype, "onNavMobCollapse");
    __decorate([
        core_1.ViewChild('navbarContent', { static: false })
    ], NavContentComponent.prototype, "navbarContent");
    __decorate([
        core_1.ViewChild('navbarWrapper', { static: false })
    ], NavContentComponent.prototype, "navbarWrapper");
    NavContentComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-content',
            templateUrl: './nav-content.component.html',
            styleUrls: ['./nav-content.component.scss']
        })
    ], NavContentComponent);
    return NavContentComponent;
}());
exports.NavContentComponent = NavContentComponent;

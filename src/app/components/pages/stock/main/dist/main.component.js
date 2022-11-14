"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainComponent = void 0;
var core_1 = require("@angular/core");
var MainComponent = /** @class */ (function () {
    function MainComponent(router) {
        this.router = router;
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent.prototype.goOne = function () {
        this.router.navigate(['/stocks/listnew']);
    };
    MainComponent.prototype.goTwo = function () {
        this.router.navigate(['/stocks/orderslist']);
    };
    MainComponent.prototype.goThree = function () {
        this.router.navigate(['/stocks/stockProducts']);
    };
    MainComponent.prototype.goFour = function () {
        this.router.navigate(['/stocks/barresCodes']);
    };
    MainComponent.prototype.goFive = function () {
        this.router.navigate(['/stocks/printbarresCodes']);
    };
    MainComponent.prototype.goSix = function () {
        this.router.navigate(['/stocks/transStocks']);
    };
    MainComponent.prototype.goSeven = function () {
        this.router.navigate(['/stocks/seuilStocks']);
    };
    MainComponent.prototype.goLast = function () {
        this.router.navigate(['/stocks/hsProducts']);
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.scss']
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;

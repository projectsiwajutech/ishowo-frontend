"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuardP5Guard = void 0;
var core_1 = require("@angular/core");
var GuardP5Guard = /** @class */ (function () {
    function GuardP5Guard(localstorageService, libraryService) {
        this.localstorageService = localstorageService;
        this.libraryService = libraryService;
    }
    GuardP5Guard.prototype.canActivate = function (route, state) {
        var group = this.localstorageService.getGroup();
        var roleP5 = group.laws.filter(function (law) { return law.reference === "P5"; })[0];
        if (roleP5.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardP5Guard.prototype.canLoad = function (route, segments) {
        var group = this.localstorageService.getGroup();
        var roleP5 = group.laws.filter(function (law) { return law.reference === "P5"; })[0];
        if (roleP5.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardP5Guard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GuardP5Guard);
    return GuardP5Guard;
}());
exports.GuardP5Guard = GuardP5Guard;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuardSQ3Guard = void 0;
var core_1 = require("@angular/core");
var GuardSQ3Guard = /** @class */ (function () {
    function GuardSQ3Guard(localstorageService, libraryService) {
        this.localstorageService = localstorageService;
        this.libraryService = libraryService;
    }
    GuardSQ3Guard.prototype.canActivate = function (route, state) {
        var group = this.localstorageService.getGroup();
        var roleSQ3 = group.laws.filter(function (law) { return law.reference === "SQ3"; })[0];
        if (roleSQ3.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardSQ3Guard.prototype.canLoad = function (route, segments) {
        var group = this.localstorageService.getGroup();
        var roleSQ3 = group.laws.filter(function (law) { return law.reference === "SQ3"; })[0];
        if (roleSQ3.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardSQ3Guard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GuardSQ3Guard);
    return GuardSQ3Guard;
}());
exports.GuardSQ3Guard = GuardSQ3Guard;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuardSQ1Guard = void 0;
var core_1 = require("@angular/core");
var GuardSQ1Guard = /** @class */ (function () {
    function GuardSQ1Guard(localstorageService, libraryService) {
        this.localstorageService = localstorageService;
        this.libraryService = libraryService;
    }
    GuardSQ1Guard.prototype.canActivate = function (route, state) {
        var group = this.localstorageService.getGroup();
        var roleSQ1 = group.laws.filter(function (law) { return law.reference === "SQ1"; })[0];
        if (roleSQ1.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardSQ1Guard.prototype.canLoad = function (route, segments) {
        var group = this.localstorageService.getGroup();
        var roleSQ1 = group.laws.filter(function (law) { return law.reference === "SQ1"; })[0];
        if (roleSQ1.ischecked == true) {
            return true;
        }
        else {
            this.libraryService.onError('Vous n\'êtes pas autorisé à accéder à cette page !', 1500, 'top');
            return false;
        }
    };
    GuardSQ1Guard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GuardSQ1Guard);
    return GuardSQ1Guard;
}());
exports.GuardSQ1Guard = GuardSQ1Guard;

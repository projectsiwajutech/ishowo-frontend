"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalStorageService = void 0;
/**
 * Created by Utilisateur on 31/03/2017.
 */
/**
 * Created by Utilisateur on 29/03/2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(http) {
        this.http = http;
    }
    //enregistre un utilisateur connecte
    LocalStorageService.prototype.saveUser = function (obj) {
        this.saveToSession("M_ITCOMMERCE_APP_USER", obj);
    };
    ;
    //retourne un user
    LocalStorageService.prototype.getUser = function () {
        return this.readFromSession("M_ITCOMMERCE_APP_USER");
    };
    ;
    //enregistre un utilisateur connecte
    LocalStorageService.prototype.saveGroup = function (obj) {
        this.saveToSession("M_ITCOMMERCE_APP_GROUP", obj);
    };
    ;
    //retourne un user
    LocalStorageService.prototype.getGroup = function () {
        return this.readFromSession("M_ITCOMMERCE_APP_GROUP");
    };
    ;
    LocalStorageService.prototype.saveToSession = function (key, value) {
        var stringified = JSON.stringify(value);
        var jsonValue = btoa(stringified);
        localStorage.setItem(key, jsonValue);
    };
    ;
    LocalStorageService.prototype.readFromSession = function (key) {
        var result = null;
        try {
            var json = localStorage.getItem(key);
            var result = JSON.parse(atob(json));
        }
        catch (e) {
            result = null;
        }
        return result;
    };
    ;
    LocalStorageService = __decorate([
        core_1.Injectable()
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;

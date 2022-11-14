"use strict";
/**
 * Created by Utilisateur on 01/04/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompleteProdNamePipe = void 0;
var core_1 = require("@angular/core");
var CompleteProdNamePipe = /** @class */ (function () {
    function CompleteProdNamePipe() {
    }
    CompleteProdNamePipe.prototype.transform = function (value) {
        var newValue;
        //controle de la longueur du nom
        var valueLenght = value.length;
        if (valueLenght > 20) {
            var diff = value.length - 23;
            newValue = value.substring(0, diff) + "...";
        }
        else {
            newValue = value;
        }
        return newValue;
    };
    CompleteProdNamePipe = __decorate([
        core_1.Pipe({ name: 'completeProdName' })
    ], CompleteProdNamePipe);
    return CompleteProdNamePipe;
}());
exports.CompleteProdNamePipe = CompleteProdNamePipe;

"use strict";
/**
 * Created by DevIshowoMig on 28/07/2021.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerByNamePipe = void 0;
var core_1 = require("@angular/core");
var CustomerByNamePipe = /** @class */ (function () {
    function CustomerByNamePipe() {
    }
    CustomerByNamePipe.prototype.transform = function (items, customerLastName, customerFirtName) {
        if (!items || (!customerLastName && !customerFirtName)) {
            return items;
        }
        //check on params
        if (customerLastName === undefined || customerLastName === null) {
            customerLastName = '';
        }
        if (customerFirtName === undefined || customerFirtName === null) {
            customerFirtName = '';
        }
        return items
            .filter(function (item) {
            //customer Lastname
            return (item.nom.toLowerCase().indexOf(customerLastName.toLowerCase()) >= 0) &&
                //customer FirstName
                (item.prenom.toLowerCase().indexOf(customerFirtName.toLowerCase()) >= 0);
        });
    }; //end transform
    CustomerByNamePipe = __decorate([
        core_1.Pipe({ name: 'customerByName' })
    ], CustomerByNamePipe);
    return CustomerByNamePipe;
}());
exports.CustomerByNamePipe = CustomerByNamePipe;

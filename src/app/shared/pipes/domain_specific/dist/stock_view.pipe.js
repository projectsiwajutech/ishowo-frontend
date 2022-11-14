"use strict";
/**
 * Created by Utilisateur on 14/04/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockViewPipe = void 0;
/**
 * Created by Utilisateur on 01/04/2017.
 */
var core_1 = require("@angular/core");
var StockViewPipe = /** @class */ (function () {
    function StockViewPipe() {
    }
    StockViewPipe.prototype.transform = function (items, prodName, categoryId, measureTypeId, compartmentId, agencyId, codebarre) {
        if (!items || (!prodName && !categoryId && !measureTypeId && !compartmentId && !agencyId && !codebarre)) {
            return items;
        }
        var result = items
            .filter(function (item) {
            //prod name
            return (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) &&
                //category
                ((categoryId !== undefined && categoryId !== 0) ?
                    (item.product.product.category.id === categoryId) : true) &&
                //measure type
                ((measureTypeId !== undefined && measureTypeId !== 0) ?
                    (item.product.measure_type.id === measureTypeId) : true) &&
                //compartment
                ((compartmentId !== undefined && compartmentId !== 0) ?
                    (item.compartment.id === compartmentId) : true) &&
                //agency
                ((agencyId !== undefined && agencyId !== 0) ?
                    (item.compartment.agency.id === agencyId) : true) &&
                //codebarre
                ((codebarre !== undefined && codebarre !== '') ?
                    (item.barcode.toLowerCase().indexOf(codebarre.toLowerCase()) >= 0) : true);
        });
        if (result === null) {
            result = [];
        }
        return result;
    }; //end transform
    StockViewPipe = __decorate([
        core_1.Pipe({ name: 'stockView' })
    ], StockViewPipe);
    return StockViewPipe;
}());
exports.StockViewPipe = StockViewPipe;

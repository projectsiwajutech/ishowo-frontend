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
exports.ProductByNameAndCodePipe = void 0;
var core_1 = require("@angular/core");
var ProductByNameAndCodePipe = /** @class */ (function () {
    function ProductByNameAndCodePipe() {
    }
    ProductByNameAndCodePipe.prototype.transform = function (items, prodName, prodRef, prodQte) {
        if (!items || (!prodName && !prodRef && !prodQte)) {
            return items;
        }
        //check on params
        if (prodName === undefined || prodName === null) {
            prodName = '';
        }
        if (prodRef === undefined || prodRef === null) {
            prodRef = '';
        }
        if (prodQte === undefined || prodQte === null) {
            prodQte = undefined;
        }
        return items
            .filter(function (item) {
            //prod name
            return (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) &&
                //codebarre
                ((prodRef !== undefined && prodRef !== '') ?
                    (item.barcode.toLowerCase().indexOf(prodRef.toLowerCase()) >= 0) : true) &&
                //qte
                ((prodQte !== undefined) ?
                    (JSON.stringify(item.quantity).indexOf(JSON.stringify(prodQte)) >= 0) : true);
        });
    }; //end transform
    ProductByNameAndCodePipe = __decorate([
        core_1.Pipe({ name: 'productbyNameAndCode' })
    ], ProductByNameAndCodePipe);
    return ProductByNameAndCodePipe;
}());
exports.ProductByNameAndCodePipe = ProductByNameAndCodePipe;

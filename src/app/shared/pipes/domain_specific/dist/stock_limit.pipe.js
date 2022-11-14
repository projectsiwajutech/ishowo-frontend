"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockLimitPipe = void 0;
var core_1 = require("@angular/core");
var StockLimitPipe = /** @class */ (function () {
    function StockLimitPipe() {
    }
    StockLimitPipe.prototype.transform = function (items, prodName, measureTypeId) {
        if (!items || (!prodName && !measureTypeId)) {
            return items;
        }
        return items
            .filter(function (item) {
            //prod name
            return (item.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) &&
                //measure type
                ((measureTypeId !== undefined && measureTypeId !== 0) ?
                    (item.produit_measure_type.measure_type.id === measureTypeId) : true);
        });
    }; //end transform
    StockLimitPipe = __decorate([
        core_1.Pipe({ name: 'stockLimit' })
    ], StockLimitPipe);
    return StockLimitPipe;
}());
exports.StockLimitPipe = StockLimitPipe;

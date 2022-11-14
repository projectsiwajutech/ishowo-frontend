"use strict";
exports.__esModule = true;
exports.ProdStockLimit = void 0;
var prodmeasuretype_1 = require("./prodmeasuretype/prodmeasuretype");
var product_1 = require("./product/product");
var ProdStockLimit = /** @class */ (function () {
    function ProdStockLimit() {
        this.id = 0;
        this.id_product = 0;
        this.product = new product_1.Product();
        this.produit_measure_type = new prodmeasuretype_1.ProdMeasureType();
    }
    return ProdStockLimit;
}());
exports.ProdStockLimit = ProdStockLimit;

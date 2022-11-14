"use strict";
exports.__esModule = true;
exports.ProdMeasureType = void 0;
var product_1 = require("../product/product");
var measuretype_1 = require("../measuretype/measuretype");
var ProdMeasureType = /** @class */ (function () {
    function ProdMeasureType() {
        this.id = 0;
        this.id_product = 0;
        this.product = new product_1.Product();
        this.measure_type = new measuretype_1.MeasureType();
    }
    return ProdMeasureType;
}());
exports.ProdMeasureType = ProdMeasureType;

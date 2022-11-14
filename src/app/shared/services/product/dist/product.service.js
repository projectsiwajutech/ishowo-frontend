"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ProductService = /** @class */ (function () {
    function ProductService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    ProductService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    //get products list
    ProductService.prototype.getProducts = function (agent) {
        return this.http.get(this.apiUrl + "params/products/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getProducts
    //search products view
    ProductService.prototype.searchProducts = function (agent, obj) {
        return this.http.post(this.apiUrl + "params/searchproducts/" + agent.id, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchProducts
    //get products types list
    ProductService.prototype.getProductTypes = function (agent) {
        return this.http.get(this.apiUrl + "params/producttypes/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getProductTypes
    //create product
    ProductService.prototype.createProduct = function (obj) {
        return this.http
            .post(this.apiUrl + "params/createproduct", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createProduct
    //update product
    ProductService.prototype.updateProduct = function (obj) {
        return this.http
            .put(this.apiUrl + "params/updateproduct", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateProduct
    //delete product
    ProductService.prototype.deleteProduct = function (id) {
        var url = this.apiUrl + "params/deleteproduct/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteProduct
    //get products stock view
    ProductService.prototype.getStockView = function (agent) {
        return this.http.get(this.apiUrl + "stock/stockview/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getStockView
    //search products stock view
    ProductService.prototype.searchStockView = function (agent, obj) {
        return this.http.post(this.apiUrl + "stock/searchstock/" + agent.id, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchStockView
    //get products stock view
    ProductService.prototype.getStockViewForSale = function (agent) {
        return this.http.get(this.apiUrl + "stock/stockviewforsale/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getStockViewForSale
    //get products stock view by ame
    ProductService.prototype.getStockViewForSaleByName = function (agent, prod) {
        return this.http
            .post(this.apiUrl + "stock/stockviewforsalebyname/" + agent.id, JSON.stringify(prod), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getStockViewByName
    //get products stock view by ame
    ProductService.prototype.getStockViewForSaleByCode = function (agent, prod) {
        return this.http
            .post(this.apiUrl + "stock/stockviewforsalebycode/" + agent.id, JSON.stringify(prod), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getStockViewByCode
    //print stock view
    ProductService.prototype.printStockView = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printstockview", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printStockView
    //update product stock view
    ProductService.prototype.updateStockView = function (obj, user) {
        return this.http
            .put(this.apiUrl + "stock/updatestockview/" + user.id, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateStockView
    //expand product stock view
    ProductService.prototype.expandStockView = function (obj, user) {
        return this.http
            .put(this.apiUrl + "stock/expandstockview/" + user.id, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin expandStockView
    //get single product stock view
    ProductService.prototype.getProductStockView = function (obj) {
        return this.http.post(this.apiUrl + "stock/productstockview", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getProductStockView
    //delete measure type for product
    ProductService.prototype.deleteProdMeasureType = function (measType) {
        return this.http
            .put(this.apiUrl + "params/deleteprodmeasuretype", JSON.stringify(measType), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin deleteProdMeasureType
    //delete product association
    ProductService.prototype.deleteProdAssociation = function (prodAss) {
        return this.http
            .put(this.apiUrl + "params/deleteprodassociation", JSON.stringify(prodAss), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin deleteProdAssociation
    //print barcodes
    ProductService.prototype.printBarCodes = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printbarcodes", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printBarCodes
    //print barcodes
    ProductService.prototype.generateBarCodes = function (obj, user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "stock/generatebarcodes", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printBarCodes
    //get stock epired
    ProductService.prototype.getStockExpired = function (obj, user) {
        return this.http
            .post(this.apiUrl + "stock/stockexpired/" + user.id, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin getStockExpired
    //generate barcodes
    ProductService.prototype.generateBarCode = function (obj) {
        return this.http.post(this.apiUrl + "report/printstockview", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin generateBarCode
    ProductService = __decorate([
        core_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;

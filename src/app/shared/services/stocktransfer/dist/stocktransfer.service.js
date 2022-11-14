"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StockTransferService = void 0;
var http_1 = require("@angular/http");
/**
 * Created by Utilisateur on 12/04/2017.
 */
/**
 * Created by Utilisateur on 26/03/2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var StockTransferService = /** @class */ (function () {
    function StockTransferService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    StockTransferService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //create product transfer between compartments
    StockTransferService.prototype.createTransfer = function (obj) {
        return this.http
            .post(this.apiUrl + "stock/createtransfer", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createTransfer
    //get transfer list
    StockTransferService.prototype.getTransferList = function (obj) {
        return this.http.get(this.apiUrl + "stock/stocktransfers/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getTransferList
    //search transfer list
    StockTransferService.prototype.searchTransfers = function (obj) {
        return this.http.post(this.apiUrl + "stock/searchstocktransfers", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchTransfers
    //print transfer list
    StockTransferService.prototype.printTransfers = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printtransfers", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printTransfers
    //print transfer item
    StockTransferService.prototype.printTransfer = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printtransfer", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printTransfer
    StockTransferService = __decorate([
        core_1.Injectable()
    ], StockTransferService);
    return StockTransferService;
}());
exports.StockTransferService = StockTransferService;

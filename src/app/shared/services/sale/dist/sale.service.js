"use strict";
/**
 * Created by Utilisateur on 26/03/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaleService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var http_3 = require("@angular/http");
var SaleService = /** @class */ (function () {
    function SaleService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    SaleService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    //get sales list
    SaleService.prototype.getSales = function (obj) {
        return this.http.get(this.apiUrl + "stock/sales/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getSales
    //create sale
    SaleService.prototype.createSale = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http
            .post(this.apiUrl + "stock/createsale", JSON.stringify(obj), options)
            .toPromise()
            .then(function (res) { return res; })["catch"](this.handleError);
    }; //fin createSale
    //cancel sale
    SaleService.prototype.cancelSale = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http
            .post(this.apiUrl + "mecef/cancelinvoice", JSON.stringify(obj), options)
            .toPromise()
            .then(function (res) { return res; })["catch"](this.handleError);
    }; //fin cancelSale
    //search sales list
    SaleService.prototype.searchSales = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "stock/searchsales", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchSales
    //print sales list
    SaleService.prototype.printSales = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printsales", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printSales
    //print sale item
    SaleService.prototype.printSale = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printsale", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printSale
    //create devis
    SaleService.prototype.createDevis = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.responseType = http_3.ResponseContentType.Blob;
        return this.http
            .post(this.apiUrl + "stock/createdevis", JSON.stringify(obj), options)
            .toPromise()
            .then(function (res) { return res; })["catch"](this.handleError);
    }; //fin createDevis
    //get devis list
    SaleService.prototype.getDevis = function (obj) {
        return this.http.get(this.apiUrl + "stock/devis/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getDevis
    //search devis list
    SaleService.prototype.searchDevis = function (obj) {
        return this.http.post(this.apiUrl + "stock/searchdevis", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchDevis
    //print devis item
    SaleService.prototype.printDevis = function (obj) {
        return this.http.post(this.apiUrl + "report/printdevis", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin printDevis
    //pay balance
    SaleService.prototype.payBalance = function (obj) {
        return this.http.post(this.apiUrl + "stock/paysalebalance", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin payBalance
    //get params Mecef list
    SaleService.prototype.getParamsMecef = function (obj) {
        return this.http.get(this.apiUrl + "mecef/paramsmecef/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getParamsMecef
    //update Mecef Params
    SaleService.prototype.updateMecefParams = function (obj) {
        return this.http
            .put(this.apiUrl + "mecef/updateparammecef", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin Update Mecef Params
    SaleService = __decorate([
        core_1.Injectable()
    ], SaleService);
    return SaleService;
}());
exports.SaleService = SaleService;

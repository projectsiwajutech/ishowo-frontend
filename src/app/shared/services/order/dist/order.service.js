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
exports.OrderService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var OrderService = /** @class */ (function () {
    function OrderService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    OrderService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    //get orders list
    OrderService.prototype.getOrders = function (obj) {
        return this.http.get(this.apiUrl + "stock/orders/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getOrders
    //get orders list
    OrderService.prototype.getSavedOrders = function (obj) {
        return this.http.get(this.apiUrl + "stock/savedorders/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getOrders
    //get ordersnotcompleted list
    OrderService.prototype.getOrdersNotCompleted = function (obj) {
        return this.http.get(this.apiUrl + "stock/ordersnotcompleted/" + obj.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getOrdersNotCompleted
    //create order
    OrderService.prototype.createOrder = function (obj) {
        return this.http
            .post(this.apiUrl + "stock/createorder", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createOrder
    //create order
    OrderService.prototype.saveOrder = function (obj) {
        return this.http
            .post(this.apiUrl + "stock/saveorder", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createOrder
    //search orders list
    OrderService.prototype.searchOrders = function (obj) {
        return this.http.post(this.apiUrl + "stock/searchorders", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchOrders
    //print order list
    OrderService.prototype.printOrders = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printorders", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printOrders
    //print order item
    OrderService.prototype.printOrder = function (obj) {
        //set header
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
        var options = new http_1.RequestOptions({ headers: headers });
        options.responseType = http_1.ResponseContentType.Blob;
        return this.http.post(this.apiUrl + "report/printorder", JSON.stringify(obj), options)
            .toPromise()
            .then(function (response) { return response; })["catch"](this.handleError);
    }; //fin printOrder
    //pay balance
    OrderService.prototype.payBalance = function (obj) {
        return this.http.post(this.apiUrl + "stock/payorderbalance", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin payBalance
    //delete savedOrder
    OrderService.prototype.deleteSavedOrder = function (id) {
        var url = this.apiUrl + "stock/deletesavedorder/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteSavedOrder
    OrderService = __decorate([
        core_1.Injectable()
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;

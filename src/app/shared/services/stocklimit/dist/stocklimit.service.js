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
exports.StockLimitService = void 0;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var StockLimitService = /** @class */ (function () {
    function StockLimitService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    StockLimitService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //get stocklimit list
    StockLimitService.prototype.getStockLimit = function (agent) {
        return this.http.get(this.apiUrl + "stock/stocklimit/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getStockLimit
    //get prod understock limit list
    StockLimitService.prototype.getProdUnderStockLimit = function (agent) {
        return this.http.get(this.apiUrl + "stock/understockproducts/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getProdUnderStockLimit
    //create stocklimit
    StockLimitService.prototype.createStockLimit = function (obj) {
        return this.http
            .post(this.apiUrl + "stock/createstocklimit", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createStockLimit
    //update stocklimit
    StockLimitService.prototype.updateStockLimit = function (obj) {
        return this.http
            .put(this.apiUrl + "stock/updatestocklimit", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateStockLimit
    //delete stocklimit
    StockLimitService.prototype.deleteStockLimit = function (id) {
        var url = this.apiUrl + "stock/deletestocklimit/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteStockLimit
    StockLimitService = __decorate([
        core_1.Injectable()
    ], StockLimitService);
    return StockLimitService;
}());
exports.StockLimitService = StockLimitService;

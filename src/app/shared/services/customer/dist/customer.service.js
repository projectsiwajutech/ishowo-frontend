"use strict";
/**
 * Created by DevIshowoMig on 13/08/2021.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerService = void 0;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var CustomerService = /** @class */ (function () {
    function CustomerService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    CustomerService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //get customers list
    CustomerService.prototype.getCustomers = function (agent) {
        return this.http.get(this.apiUrl + "params/customers/" + agent.id)
            //.map(response => response.json().data as Agency[])
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getCustomers
    //create customer
    CustomerService.prototype.createCustomer = function (obj) {
        return this.http
            .post(this.apiUrl + "params/createcustomer", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createCustomer
    //update customer
    CustomerService.prototype.updateCustomer = function (obj) {
        return this.http
            .put(this.apiUrl + "params/updatecustomer", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateCustomer
    //delete customer
    CustomerService.prototype.deleteCustomer = function (id) {
        var url = this.apiUrl + "params/deletecustomer/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteCustomer
    CustomerService = __decorate([
        core_1.Injectable()
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;

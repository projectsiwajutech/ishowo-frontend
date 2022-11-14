"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VirtualAccountService = void 0;
var core_1 = require("@angular/core");
var VirtualAccountService = /** @class */ (function () {
    function VirtualAccountService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    VirtualAccountService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //get virtual account list
    VirtualAccountService.prototype.getVirtualAccounts = function (agent) {
        return this.http.get(this.apiUrl + "finances/vaccounts/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getVirtualAccounts
    //create virtual account
    VirtualAccountService.prototype.createVirtualAccount = function (obj) {
        return this.http
            .post(this.apiUrl + "finances/createvaccount", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createVirtualAccount
    //update virtual account
    VirtualAccountService.prototype.updateVirtualAccount = function (obj) {
        return this.http
            .put(this.apiUrl + "finances/updatevaccount", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateVirtualAccount
    //delete virtual account
    VirtualAccountService.prototype.deleteVirtualAccount = function (id) {
        var url = this.apiUrl + "finances/deletevaccount/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteVirtualAccount
    //get account types list
    VirtualAccountService.prototype.getAccountTypes = function (agent) {
        return this.http.get(this.apiUrl + "params/accounttypes/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getAccountTypes
    VirtualAccountService.prototype.getOperationTypes = function () {
        var opTypes = [];
        opTypes.push("DEPOT");
        opTypes.push("RETRAIT");
        //opTypes.push(TypeFinOperation.DEPOT);
        return opTypes;
    }; //fin getOperationTypes
    //get finoperations list
    VirtualAccountService.prototype.getFinOperations = function (agent) {
        return this.http.get(this.apiUrl + "finances/finoperations/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getFinOperations
    //search finoperations list
    VirtualAccountService.prototype.searchFinOperations = function (obj) {
        return this.http.post(this.apiUrl + "finances/searchfinoperations", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchFinOperations
    //create fin operations
    VirtualAccountService.prototype.createFinOperation = function (obj) {
        return this.http
            .post(this.apiUrl + "finances/createfinoperation", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createFinOperation
    VirtualAccountService = __decorate([
        core_1.Injectable()
    ], VirtualAccountService);
    return VirtualAccountService;
}());
exports.VirtualAccountService = VirtualAccountService;

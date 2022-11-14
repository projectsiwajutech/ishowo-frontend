"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
/**
 * Created by Utilisateur on 26/03/2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var UserService = /** @class */ (function () {
    function UserService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    UserService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    //get user list
    UserService.prototype.getAgents = function (agent) {
        return this.http.get(this.apiUrl + "auth/agents/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getAgents
    //get customers list
    UserService.prototype.getCustomers = function (agent) {
        return this.http.get(this.apiUrl + "auth/customers/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getCustomers
    //create supplier
    UserService.prototype.createAgent = function (obj) {
        return this.http
            .post(this.apiUrl + "auth/createagent", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createAgent
    //update supplier
    UserService.prototype.updateAgent = function (obj) {
        return this.http
            .put(this.apiUrl + "auth/updateagent", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateAgent
    //delete supplier
    UserService.prototype.deleteAgent = function (id) {
        var url = this.apiUrl + "auth/deleteagent/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteAgent
    //get user list
    UserService.prototype.getGroups = function () {
        return this.http.get(this.apiUrl + "params/groups")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getGroups
    //get user list
    UserService.prototype.getGroupsList = function () {
        return this.http.get(this.apiUrl + "params/groupslist")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getGroups
    //get log list
    UserService.prototype.getLogs = function (agent) {
        return this.http.get(this.apiUrl + "params/logs/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getLogs
    //search log list
    UserService.prototype.searchLogs = function (obj) {
        return this.http.post(this.apiUrl + "params/searchlogs", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin searchLogs
    //get roles list
    UserService.prototype.getRoles = function () {
        return this.http.get(this.apiUrl + "params/roles")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getRoles
    //create groupe
    UserService.prototype.createGroup = function (groupe, roles, agent) {
        var body = { group: groupe, laws: roles };
        return this.http.post(this.apiUrl + "params/creategroup/" + agent.id, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createGroup
    //update group
    UserService.prototype.updateGroup = function (groupe, roles, agent) {
        var body = { group: groupe, laws: roles };
        return this.http.put(this.apiUrl + "params/updategroup/" + agent.id, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateGroup
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

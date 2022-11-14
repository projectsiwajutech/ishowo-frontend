"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileService = void 0;
/**
 * Created by Utilisateur on 26/03/2017.
 */
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var ProfileService = /** @class */ (function () {
    function ProfileService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.licenceUrl = appService.getLicenceUrl();
        this.headers = appService.getHeaders();
    }
    ProfileService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    //get url api
    ProfileService.prototype.getApiUrl = function () {
        return this.http.get(this.apiUrl + "licence/apiurl")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getApiUrl
    //get profile list
    ProfileService.prototype.getProfiles = function (agent) {
        return this.http.get(this.apiUrl + "auth/profiles/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getProfiles
    //create profile
    ProfileService.prototype.createProfile = function (obj) {
        return this.http
            .post(this.apiUrl + "auth/createprofile", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createProfile
    //update profile
    ProfileService.prototype.updateProfile = function (obj) {
        return this.http
            .put(this.apiUrl + "auth/updateprofile", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateProfile
    //update company details
    ProfileService.prototype.updateCompanyProfile = function (obj) {
        return this.http
            .put(this.apiUrl + "auth/updatecompanyprofile", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateCompanyProfile
    //delete profile
    ProfileService.prototype.deleteProfile = function (id) {
        var url = this.apiUrl + "auth/deleteprofile/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteProfile
    //login
    ProfileService.prototype.login = function (obj) {
        return this.http
            .post(this.apiUrl + "auth/signin", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin login
    //get userbycode
    ProfileService.prototype.getUserByCode = function (code) {
        return this.http
            .post(this.apiUrl + "licence/activeprofile", JSON.stringify(code), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin getUserByCode
    //update profile
    ProfileService.prototype.updateConnectedUserProfile = function (obj) {
        return this.http
            .put(this.apiUrl + "auth/updateuserprofile", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateConnectedUserProfile
    //refresh tic
    ProfileService.prototype.refreshTic = function (obj) {
        return this.http
            .get(this.apiUrl + "auth/tic")
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin refreshTic
    //get modules list
    ProfileService.prototype.getModules = function () {
        return this.http.get(this.licenceUrl + "modules")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getModules
    //get formules list
    ProfileService.prototype.getFormules = function () {
        return this.http.get(this.licenceUrl + "formules")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getFormules
    //get modules list fu
    ProfileService.prototype.getModulesFu = function () {
        return this.http.get(this.licenceUrl + "modulesfu")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getModulesFu
    //get fprint
    ProfileService.prototype.getFPrint = function () {
        return this.http.get(this.licenceUrl + "fprint")
            .toPromise()
            .then(function (response) { return response.text(); })["catch"](this.handleError);
    }; //fin getFPrint
    //get last licence
    ProfileService.prototype.getLastLicence = function () {
        return this.http.get(this.apiUrl + "params/currentliccode")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getLastLicence
    //get last licence for update
    ProfileService.prototype.getLastLicenceForUpdate = function () {
        return this.http.get(this.apiUrl + "licence/currentliccode")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getLastLicenceForUpdate
    //ask for licene
    ProfileService.prototype.askForLicenceNew = function (obj) {
        return this.http
            .post(this.licenceUrl + "licence/new", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin askForLicenceNew
    //save licene
    ProfileService.prototype.saveLicence = function (obj) {
        return this.http
            .post(this.apiUrl + "licence/licencenew", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin saveLicence
    //ask for licene
    ProfileService.prototype.askForLicenceUpdate = function (obj) {
        return this.http
            .put(this.licenceUrl + "licence/change", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin askForLicenceUpdate
    //save licene
    ProfileService.prototype.updateLicenceChange = function (obj) {
        return this.http
            .post(this.apiUrl + "licence/licencechange", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateLicenceChange
    //get current licence
    ProfileService.prototype.getCurrentLicence = function () {
        return this.http.get(this.apiUrl + "params/currentlicence")
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getLicence
    //get group roles for user
    ProfileService.prototype.getGroupRoles = function (group) {
        return this.http.get(this.apiUrl + "params/groupwithroles/" + group.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getGroupRoles
    //get crypted Passwoed
    ProfileService.prototype.cryptPassword = function (password) {
        return this.http.get(this.apiUrl + "params/cryptuserpass/" + password)
            .toPromise()
            .then(function (response) { return response.text(); })["catch"](this.handleError);
    }; //fin crypted Password
    ProfileService = __decorate([
        core_1.Injectable()
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;

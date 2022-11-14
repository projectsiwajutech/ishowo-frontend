"use strict";
/**
 * Created by Utilisateur on 28/03/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MeasureTypeService = void 0;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var MeasureTypeService = /** @class */ (function () {
    function MeasureTypeService(http, appService) {
        this.http = http;
        this.appService = appService;
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }
    MeasureTypeService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    //get categories list
    MeasureTypeService.prototype.getMeasureTypes = function (agent) {
        return this.http.get(this.apiUrl + "params/measuretypes/" + agent.id)
            .toPromise()
            .then(function (response) { return response.json(); })["catch"](this.handleError);
    }; //fin getMeasureTypes
    //create measuretype
    MeasureTypeService.prototype.createMeasureType = function (obj) {
        return this.http
            .post(this.apiUrl + "params/createmeasuretype", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin createCategory
    //update measuretype
    MeasureTypeService.prototype.updateMeasureType = function (obj) {
        return this.http
            .put(this.apiUrl + "params/updatemeasuretype", JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.handleError);
    }; //fin updateCategory
    //delete measuretype
    MeasureTypeService.prototype.deleteMeasureType = function (id) {
        var url = this.apiUrl + "params/deletemeasuretype/" + id;
        return this.http["delete"](url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })["catch"](this.handleError);
    }; //fin deleteMeasureType
    MeasureTypeService = __decorate([
        core_1.Injectable()
    ], MeasureTypeService);
    return MeasureTypeService;
}());
exports.MeasureTypeService = MeasureTypeService;

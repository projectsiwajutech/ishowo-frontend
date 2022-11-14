"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrentComponent = void 0;
var core_1 = require("@angular/core");
var licence_1 = require("src/app/shared/models/licence/licence");
var CurrentComponent = /** @class */ (function () {
    function CurrentComponent(profilService, libraryService, locStorService, route, router) {
        this.profilService = profilService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.isLoading = false;
        this.isLicenceOk = false;
        this.iLicence = new licence_1.Licence();
        this.visible = true;
        this.communicated = new core_1.EventEmitter();
    }
    CurrentComponent.prototype.ngOnInit = function () {
        this.getCurrentLicence();
    };
    //get licence status
    CurrentComponent.prototype.getLicenceStatus = function (status) {
        if (status === true)
            return "ACTIVEE";
        else
            return "INACTIVE";
    }; //fin getLicenceStatus
    //get getCurrentLicence
    CurrentComponent.prototype.getCurrentLicence = function () {
        var _this = this;
        this.isLoading = true;
        this.profilService.getCurrentLicence()
            .then(function (result) {
            _this.isLoading = false;
            if (result !== null) {
                _this.iLicence = result;
                _this.communicated.emit(_this.canDisplayAlert());
            }
            else {
                alert("Une erreur est survenue");
            }
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getCurrentLicence
    //get description
    CurrentComponent.prototype.getDescription = function () {
        if (this.iLicence.module === null || this.iLicence.module === undefined)
            return "";
        return this.iLicence.module;
    }; //fin getDescription
    //get remaining days
    CurrentComponent.prototype.getRemainingDays = function () {
        if (this.iLicence === undefined)
            return 0;
        var diffDays = 0;
        var timeDiff = 0;
        var dateExp = new Date(this.iLicence.expiryDate);
        var dateAct = new Date();
        timeDiff = Math.abs(dateExp.getTime() - dateAct.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }; //fin getRemainingDays
    //can display alert
    CurrentComponent.prototype.canDisplayAlert = function () {
        if (this.iLicence === undefined)
            return false;
        var totalDays = 0;
        var timeDiff = 0;
        var dateExp = new Date(this.iLicence.expiryDate);
        var dateAct = new Date(this.iLicence.activationDate);
        timeDiff = Math.abs(dateExp.getTime() - dateAct.getTime());
        totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var remainingDays = this.getRemainingDays();
        if ((totalDays / 2) > remainingDays)
            return true;
        else
            return false;
    }; //fin canDisplayAlert
    __decorate([
        core_1.Input()
    ], CurrentComponent.prototype, "visible");
    __decorate([
        core_1.Output()
    ], CurrentComponent.prototype, "communicated");
    CurrentComponent = __decorate([
        core_1.Component({
            selector: 'app-current',
            templateUrl: './current.component.html',
            styleUrls: ['./current.component.scss']
        })
    ], CurrentComponent);
    return CurrentComponent;
}());
exports.CurrentComponent = CurrentComponent;

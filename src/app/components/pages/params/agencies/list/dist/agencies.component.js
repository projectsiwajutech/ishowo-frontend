"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgenciesComponent = void 0;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var agency_create_component_1 = require("../create/agency-create.component");
var agency_update_component_1 = require("../update/agency-update.component");
var agency_delete_component_1 = require("../delete/agency-delete.component");
var AgenciesComponent = /** @class */ (function () {
    function AgenciesComponent(modalService, constantService, agencyService, locStorService, location) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.agencyService = agencyService;
        this.locStorService = locStorService;
        this.location = location;
        this.agencies = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    AgenciesComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getAgencies();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of agencies
    AgenciesComponent.prototype.getAgencies = function () {
        var _this = this;
        this.isLoading = true;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            _this.isLoading = false;
            if (agencies.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.agencies = agencies;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getAgencies
    //track by
    AgenciesComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    AgenciesComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(agency_create_component_1.AgencyCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    AgenciesComponent.prototype.deleteModal = function (agency) {
        var modalRef = this.modalService.open(agency_delete_component_1.AgencyDeleteComponent);
        modalRef.componentInstance.item = agency;
    }; // end createModal
    //modal de mis-à-jour
    AgenciesComponent.prototype.updateModal = function (agency) {
        var modalRef = this.modalService.open(agency_update_component_1.AgencyUpdateComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    AgenciesComponent = __decorate([
        core_1.Component({
            selector: 'app-agencies',
            templateUrl: './agencies.component.html',
            styleUrls: ['./agencies.component.scss']
        })
    ], AgenciesComponent);
    return AgenciesComponent;
}());
exports.AgenciesComponent = AgenciesComponent;

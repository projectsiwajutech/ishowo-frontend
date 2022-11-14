"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompartmentsComponent = void 0;
var core_1 = require("@angular/core");
var compartment_create_component_1 = require("../create/compartment-create.component");
var compartment_delete_component_1 = require("../delete/compartment-delete.component");
var compartment_update_component_1 = require("../update/compartment-update.component");
var CompartmentsComponent = /** @class */ (function () {
    function CompartmentsComponent(modalService, constantService, compartmentService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.compartmentService = compartmentService;
        this.locStorService = locStorService;
        this.route = route;
        this.compartments = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    CompartmentsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getCompartments();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of compartments
    CompartmentsComponent.prototype.getCompartments = function () {
        var _this = this;
        this.isLoading = true;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            _this.isLoading = false;
            if (compartments.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.compartments = compartments;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getCompartments
    //track by
    CompartmentsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    CompartmentsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(compartment_create_component_1.CompartmentCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    CompartmentsComponent.prototype.updateModal = function (compartment) {
        var modalRef = this.modalService.open(compartment_update_component_1.CompartmentUpdateComponent);
        modalRef.componentInstance.item = compartment;
    }; //fin updateModal
    //modal de Suppression
    CompartmentsComponent.prototype.deleteModal = function (compartment) {
        var modalRef = this.modalService.open(compartment_delete_component_1.CompartmentDeleteComponent);
        modalRef.componentInstance.item = compartment;
    }; //fin Suppression
    CompartmentsComponent = __decorate([
        core_1.Component({
            selector: 'app-compartments',
            templateUrl: './compartments.component.html',
            styleUrls: ['./compartments.component.scss']
        })
    ], CompartmentsComponent);
    return CompartmentsComponent;
}());
exports.CompartmentsComponent = CompartmentsComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VaccountsComponent = void 0;
var core_1 = require("@angular/core");
var vaccount_create_component_1 = require("../create/vaccount-create.component");
var vaccount_delete_component_1 = require("../delete/vaccount-delete.component");
var vaccount_update_component_1 = require("../update/vaccount-update.component");
var VaccountsComponent = /** @class */ (function () {
    function VaccountsComponent(modalService, vAccountService, locStorService, route) {
        this.modalService = modalService;
        this.vAccountService = vAccountService;
        this.locStorService = locStorService;
        this.route = route;
        this.vaccounts = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    VaccountsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getVirtualAccounts();
    };
    //get list of account
    VaccountsComponent.prototype.getVirtualAccounts = function () {
        var _this = this;
        this.isLoading = true;
        this.vaccounts = [];
        this.vAccountService.getVirtualAccounts(this.user)
            .then(function (banks) {
            _this.isLoading = false;
            if (banks.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.vaccounts = banks;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getVirtualAccounts
    //track by
    VaccountsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    VaccountsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(vaccount_create_component_1.VaccountCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    VaccountsComponent.prototype.deleteModal = function (agency) {
        var modalRef = this.modalService.open(vaccount_delete_component_1.VaccountDeleteComponent);
        modalRef.componentInstance.item = agency;
    }; // end createModal
    //modal de mis-à-jour
    VaccountsComponent.prototype.updateModal = function (agency) {
        var modalRef = this.modalService.open(vaccount_update_component_1.VaccountUpdateComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    VaccountsComponent = __decorate([
        core_1.Component({
            selector: 'app-vaccounts',
            templateUrl: './vaccounts.component.html',
            styleUrls: ['./vaccounts.component.scss']
        })
    ], VaccountsComponent);
    return VaccountsComponent;
}());
exports.VaccountsComponent = VaccountsComponent;

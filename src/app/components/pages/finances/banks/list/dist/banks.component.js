"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BanksComponent = void 0;
var core_1 = require("@angular/core");
var bank_create_component_1 = require("../create/bank-create.component");
var bank_delete_component_1 = require("../delete/bank-delete.component");
var bank_update_component_1 = require("../update/bank-update.component");
var BanksComponent = /** @class */ (function () {
    function BanksComponent(modalService, constantService, bankService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.bankService = bankService;
        this.locStorService = locStorService;
        this.route = route;
        this.page = 1;
        this.pageSize = 30;
        this.banks = [];
        this.isCreateVisible = false;
        this.isLoading = false;
    }
    BanksComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getBanks();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of banks
    BanksComponent.prototype.getBanks = function () {
        var _this = this;
        this.isLoading = true;
        this.banks = [];
        this.bankService.getBanks(this.user)
            .then(function (banks) {
            _this.isLoading = false;
            if (banks.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.banks = banks;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getBanks
    //track by
    BanksComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    BanksComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(bank_create_component_1.BankCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    BanksComponent.prototype.deleteModal = function (agency) {
        var modalRef = this.modalService.open(bank_delete_component_1.BankDeleteComponent);
        modalRef.componentInstance.item = agency;
    }; // end createModal
    //modal de mis-à-jour
    BanksComponent.prototype.updateModal = function (agency) {
        var modalRef = this.modalService.open(bank_update_component_1.BankUpdateComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    BanksComponent = __decorate([
        core_1.Component({
            selector: 'app-banks',
            templateUrl: './banks.component.html',
            styleUrls: ['./banks.component.scss']
        })
    ], BanksComponent);
    return BanksComponent;
}());
exports.BanksComponent = BanksComponent;

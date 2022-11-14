"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersComponent = void 0;
var core_1 = require("@angular/core");
var customer_create_component_1 = require("../create/customer-create.component");
var customer_delete_component_1 = require("../delete/customer-delete.component");
var customer_update_component_1 = require("../update/customer-update.component");
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(modalService, constantService, locStorService, customerService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.locStorService = locStorService;
        this.customerService = customerService;
        this.route = route;
        this.customers = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getCustomers();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of customers
    CustomersComponent.prototype.getCustomers = function () {
        var _this = this;
        this.isLoading = true;
        this.customers = [];
        this.customerService.getCustomers(this.user)
            .then(function (customers) {
            _this.isLoading = false;
            if (customers.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.customers = customers;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getCustomers
    //track by
    CustomersComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    CustomersComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(customer_create_component_1.CustomerCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    CustomersComponent.prototype.updateModal = function (supplier) {
        var modalRef = this.modalService.open(customer_update_component_1.CustomerUpdateComponent);
        modalRef.componentInstance.item = supplier;
    }; //fin updateModal
    //modal de suppression
    CustomersComponent.prototype.deleteModal = function (supplier) {
        var modalRef = this.modalService.open(customer_delete_component_1.CustomerDeleteComponent);
        modalRef.componentInstance.item = supplier;
    }; //fin suppression
    CustomersComponent = __decorate([
        core_1.Component({
            selector: 'app-customers',
            templateUrl: './customers.component.html',
            styleUrls: ['./customers.component.scss']
        })
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;

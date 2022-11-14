"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SuppliersComponent = void 0;
var core_1 = require("@angular/core");
var supplier_create_component_1 = require("../create/supplier-create.component");
var supplier_delete_component_1 = require("../delete/supplier-delete.component");
var supplier_update_component_1 = require("../update/supplier-update.component");
var SuppliersComponent = /** @class */ (function () {
    function SuppliersComponent(modalService, constantService, supplierService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.supplierService = supplierService;
        this.locStorService = locStorService;
        this.route = route;
        this.suppliers = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    SuppliersComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getSuppliers();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of suppliers
    SuppliersComponent.prototype.getSuppliers = function () {
        var _this = this;
        this.isLoading = true;
        this.suppliers = [];
        this.supplierService.getSuppliers(this.user)
            .then(function (suppliers) {
            _this.isLoading = false;
            if (suppliers.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.suppliers = suppliers;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getSuppliers
    //track by
    SuppliersComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //select for update
    SuppliersComponent.prototype.selectForUpdate = function (obj) {
        this.selectedUpObject = obj;
    }; //fin selectForUpdate
    //select for delete
    SuppliersComponent.prototype.selectForDelete = function (obj) {
        this.selectedDelObject = obj;
    }; //fin selectForUpdate
    //modal d'ajout
    SuppliersComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(supplier_create_component_1.SupplierCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    SuppliersComponent.prototype.updateModal = function (supplier) {
        var modalRef = this.modalService.open(supplier_update_component_1.SupplierUpdateComponent);
        modalRef.componentInstance.item = supplier;
    }; //fin updateModal
    //modal de suppression
    SuppliersComponent.prototype.deleteModal = function (supplier) {
        var modalRef = this.modalService.open(supplier_delete_component_1.SupplierDeleteComponent);
        modalRef.componentInstance.item = supplier;
    }; //fin suppression
    SuppliersComponent = __decorate([
        core_1.Component({
            selector: 'app-suppliers',
            templateUrl: './suppliers.component.html',
            styleUrls: ['./suppliers.component.scss']
        })
    ], SuppliersComponent);
    return SuppliersComponent;
}());
exports.SuppliersComponent = SuppliersComponent;

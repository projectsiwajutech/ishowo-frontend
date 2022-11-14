"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SupplierCreateComponent = void 0;
var core_1 = require("@angular/core");
var supplier_1 = require("src/app/shared/models/supplier/supplier");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var SupplierCreateComponent = /** @class */ (function () {
    function SupplierCreateComponent(router, activeModal, supplierService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.supplierService = supplierService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    SupplierCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
    };
    //create object
    SupplierCreateComponent.prototype.save = function (form) {
        var _this = this;
        var data = { "name": form.name, "address": form.address };
        this.item = new supplier_1.Supplier();
        this.item.name = form.name;
        this.item.address = form.address;
        this.item.phone = form.phone;
        this.item.email = form.email;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.supplierService.createSupplier(this.item)
            .then(function (result) {
            _this.show = true;
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = result;
            _this.created.emit("created");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    SupplierCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    SupplierCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
    };
    //Enregistrement réussie
    SupplierCreateComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Enregistrement réussi!',
            showConfirmButton: false,
            icon: "success",
            timer: 1100,
            timerProgressBar: true
        });
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Echec de l'enregistrement
    SupplierCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    SupplierCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    SupplierCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("supplier_name").focus();
    };
    __decorate([
        core_1.Input()
    ], SupplierCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], SupplierCreateComponent.prototype, "created");
    SupplierCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-supplier-create',
            templateUrl: './supplier-create.component.html',
            styleUrls: ['./supplier-create.component.scss']
        })
    ], SupplierCreateComponent);
    return SupplierCreateComponent;
}());
exports.SupplierCreateComponent = SupplierCreateComponent;

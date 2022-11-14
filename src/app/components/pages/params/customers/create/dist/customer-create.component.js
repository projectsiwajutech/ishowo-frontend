"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerCreateComponent = void 0;
var core_1 = require("@angular/core");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var customer_1 = require("src/app/shared/models/customer/customer");
var CustomerCreateComponent = /** @class */ (function () {
    function CustomerCreateComponent(router, activeModal, customerService, locStorService, libraryService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.customerService = customerService;
        this.locStorService = locStorService;
        this.libraryService = libraryService;
        this.route = route;
        this.show = false;
        this.is_checked = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    CustomerCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
    };
    //create object
    CustomerCreateComponent.prototype.save = function (form) {
        var _this = this;
        //si c'est une enterprise
        this.show = true;
        if (this.is_checked) {
            if (form.social_reason === "" || form.num_ifu === "") {
                this.libraryService.onWarning('Raison Sociale et Numéro IFU Obligatoires!', 1000, 'top-end');
            }
            else {
                this.item = new customer_1.Customer();
                this.item.social_reason = form.social_reason;
                this.item.num_ifu = form.num_ifu;
                this.item.telephone = form.phone;
                this.item.email = form.email;
                this.item.whatsapp = form.whatsapp;
                this.item.date_creation = new Date();
            }
        }
        //si c'est une personne
        else if (!this.is_checked) {
            if (form.lastName === "" || form.firstName === "") {
                return this.libraryService.onWarning('Nom et Prénom(s) Obligatoires!', 1000, 'top-end');
            }
            else {
                this.item = new customer_1.Customer();
                this.item.nom = form.nom;
                this.item.prenom = form.prenom;
                this.item.telephone = form.phone;
                this.item.email = form.email;
                this.item.whatsapp = form.whatsapp;
                this.item.date_creation = new Date();
            }
        }
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.customerService.createCustomer(this.item)
            .then(function (result) {
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
    CustomerCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    CustomerCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
    };
    //Enregistrement réussie
    CustomerCreateComponent.prototype.successSwal = function () {
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
    CustomerCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    CustomerCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    CustomerCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("customer_name").focus();
    };
    // OnchangeStatut of Devis Switch
    CustomerCreateComponent.prototype.OnchangeStatut = function ($event) {
        this.is_checked = $event.target.checked;
    }; //fin OnchangeStatut of Devis Switch
    __decorate([
        core_1.Input()
    ], CustomerCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CustomerCreateComponent.prototype, "created");
    CustomerCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-create',
            templateUrl: './customer-create.component.html',
            styleUrls: ['./customer-create.component.scss']
        })
    ], CustomerCreateComponent);
    return CustomerCreateComponent;
}());
exports.CustomerCreateComponent = CustomerCreateComponent;

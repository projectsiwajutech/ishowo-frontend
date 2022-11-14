"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewCustomerComponent = void 0;
var core_1 = require("@angular/core");
var customer_1 = require("src/app/shared/models/customer/customer");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var NewCustomerComponent = /** @class */ (function () {
    function NewCustomerComponent(activeModal, toastEvent, customerService, libraryService, locStorService, route, router) {
        this.activeModal = activeModal;
        this.toastEvent = toastEvent;
        this.customerService = customerService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.isCreateVisible = false;
        this.isLoading = false;
        //state indicators
        this.show = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        //enregistrement entreprise
        this.is_checked = false;
        //customer
        this.customers = [];
    }
    NewCustomerComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getCustomers();
    };
    //get list of customers
    NewCustomerComponent.prototype.getCustomers = function () {
        var _this = this;
        this.isLoading = true;
        this.customers = [];
        this.customerService.getCustomers(this.user)
            .then(function (customers) {
            _this.isLoading = false;
            _this.customers = customers;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getCustomers
    //save selected Client
    NewCustomerComponent.prototype.SaveSelectedCustomer = function (customer) {
        this.locStorService.saveToSession('Customer', customer);
        this.close();
    }; //fin save selected Client
    //track by
    NewCustomerComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //create customer
    NewCustomerComponent.prototype.save = function (form) {
        var _this = this;
        //si c'est une enterprise
        if (this.is_checked) {
            if (form.social_reason === "" || form.num_ifu === "") {
                this.libraryService.onWarning('Raison Sociale et Numéro IFU Obligatoires!', 1000, 'top-end');
            }
            else {
                this.item = new customer_1.Customer();
                this.item.social_reason = form.social_reason;
                this.item.num_ifu = form.num_ifu;
                this.item.telephone = form.telephone;
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
                this.item.nom = form.lastName;
                this.item.prenom = form.firstName;
                this.item.telephone = form.telephone;
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
            _this.show = true;
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.item = result;
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal(_this.item);
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //fin create customer
    //Fermeture
    NewCustomerComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    //Enregistrement réussie
    NewCustomerComponent.prototype.successSwal = function (customer) {
        this.locStorService.saveToSession('Customer', customer);
        this.close();
        this.libraryService.onSuccess('Nouveau Client Enregistré avec succès!', 1200, 'top-end');
    };
    //Echec de l'enregistrement
    NewCustomerComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    // OnchangeStatut of Devis Switch
    NewCustomerComponent.prototype.OnchangeStatut = function ($event) {
        this.is_checked = $event.target.checked;
    }; //fin OnchangeStatut of Devis Switch
    NewCustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-new-customer',
            templateUrl: './new-customer.component.html',
            styleUrls: ['./new-customer.component.scss']
        })
    ], NewCustomerComponent);
    return NewCustomerComponent;
}());
exports.NewCustomerComponent = NewCustomerComponent;

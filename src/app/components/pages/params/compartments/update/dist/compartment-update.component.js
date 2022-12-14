"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompartmentUpdateComponent = void 0;
var core_1 = require("@angular/core");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var CompartmentUpdateComponent = /** @class */ (function () {
    function CompartmentUpdateComponent(router, activeModal, agencyService, compartmentService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.agencyService = agencyService;
        this.compartmentService = compartmentService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.agencies = [];
        this.updated = new core_1.EventEmitter();
    }
    CompartmentUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.getAgencies();
    };
    CompartmentUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        if (this.agencies.length !== 0) {
            this.selectAgency();
        }
        else {
            this.getAgencies();
        }
    }; //end ngOnChanges
    //create object
    CompartmentUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.compartmentService.updateCompartment(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = null;
            ;
            _this.updated.emit("updated");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez r??essayer";
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    CompartmentUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    CompartmentUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //select an agency
    CompartmentUpdateComponent.prototype.selectAgency = function () {
        var _this = this;
        if (this.agencies === null || this.agencies === undefined)
            return;
        if (this.agencies.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new compartment_1.Compartment();
            this.item.agency = this.agencies.filter(function (agency) { return agency.id === _this.item.agency.id; })[0];
        }
    }; //fin selectAgency
    //get list of agencies
    CompartmentUpdateComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            _this.agencies = agencies;
            _this.selectAgency();
        }, function (error) {
        });
    }; //fin getAgencies
    //Enregistrement r??ussie
    CompartmentUpdateComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Enregistrement r??ussi!',
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
    CompartmentUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    CompartmentUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    CompartmentUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("compartment_name").focus();
    };
    __decorate([
        core_1.Input()
    ], CompartmentUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], CompartmentUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CompartmentUpdateComponent.prototype, "updated");
    CompartmentUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-compartment-update',
            templateUrl: './compartment-update.component.html',
            styleUrls: ['./compartment-update.component.scss']
        })
    ], CompartmentUpdateComponent);
    return CompartmentUpdateComponent;
}());
exports.CompartmentUpdateComponent = CompartmentUpdateComponent;

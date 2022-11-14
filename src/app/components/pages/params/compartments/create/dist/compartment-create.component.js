"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompartmentCreateComponent = void 0;
var core_1 = require("@angular/core");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var CompartmentCreateComponent = /** @class */ (function () {
    function CompartmentCreateComponent(router, activeModal, agencyService, compartmentService, locStorService, route) {
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
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    CompartmentCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new compartment_1.Compartment();
        this.getAgencies();
    };
    CompartmentCreateComponent.prototype.ngOnChanges = function () {
        this.item = new compartment_1.Compartment();
    }; //end ngOnChanges
    //create object
    CompartmentCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item = new compartment_1.Compartment();
        this.item.name = form.name;
        this.item.agency = form.agency;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.compartmentService.createCompartment(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            // /this.item = result;
            _this.item = new compartment_1.Compartment();
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
    CompartmentCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    CompartmentCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new compartment_1.Compartment();
    };
    //get list of agencies
    CompartmentCreateComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            _this.agencies = agencies;
        }, function (error) {
        });
    }; //fin getAgencies
    //Enregistrement réussie
    CompartmentCreateComponent.prototype.successSwal = function () {
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
    CompartmentCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    CompartmentCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    CompartmentCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("compartment_name").focus();
    };
    __decorate([
        core_1.Input()
    ], CompartmentCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CompartmentCreateComponent.prototype, "created");
    CompartmentCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-compartment-create',
            templateUrl: './compartment-create.component.html',
            styleUrls: ['./compartment-create.component.scss']
        })
    ], CompartmentCreateComponent);
    return CompartmentCreateComponent;
}());
exports.CompartmentCreateComponent = CompartmentCreateComponent;

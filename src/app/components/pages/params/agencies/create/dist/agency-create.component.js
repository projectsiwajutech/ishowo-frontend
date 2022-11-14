"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgencyCreateComponent = void 0;
var core_1 = require("@angular/core");
var agency_1 = require("src/app/shared/models/agency/agency");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var AgencyCreateComponent = /** @class */ (function () {
    function AgencyCreateComponent(router, activeModal, agencyService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.agencyService = agencyService;
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
    AgencyCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
    };
    //create object
    AgencyCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        var data = { "name": form.name, "address": form.address };
        this.item = new agency_1.Agency();
        this.item.name = form.name;
        this.item.address = form.address;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.agencyService.createAgency(this.item)
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
    AgencyCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    AgencyCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
    };
    //Enregistrement réussie
    AgencyCreateComponent.prototype.successSwal = function () {
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
    AgencyCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    AgencyCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    AgencyCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("agency_name").focus();
    };
    __decorate([
        core_1.Input()
    ], AgencyCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], AgencyCreateComponent.prototype, "created");
    AgencyCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-agency-create',
            templateUrl: './agency-create.component.html',
            styleUrls: ['./agency-create.component.scss']
        })
    ], AgencyCreateComponent);
    return AgencyCreateComponent;
}());
exports.AgencyCreateComponent = AgencyCreateComponent;

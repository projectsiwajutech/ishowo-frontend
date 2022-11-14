"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaletargetUpdateComponent = void 0;
var core_1 = require("@angular/core");
var saletarget_1 = require("src/app/shared/models/saletarget/saletarget");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var SaletargetUpdateComponent = /** @class */ (function () {
    function SaletargetUpdateComponent(router, activeModal, saleTargetService, profileService, libraryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.saleTargetService = saleTargetService;
        this.profileService = profileService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.updated = new core_1.EventEmitter();
    }
    SaletargetUpdateComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.getProfiles();
    };
    SaletargetUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        if (this.profiles === undefined) {
            this.getProfiles();
        }
        else {
            this.selectProfile();
        }
    }; //end ngOnChanges
    //create object
    SaletargetUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.saleTargetService.updateSaleTarget(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = null;
            _this.updated.emit("updated");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = _this.libraryService.getServiceErrorText(error);
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //end save
    //show creation form
    SaletargetUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    SaletargetUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //select a profile
    SaletargetUpdateComponent.prototype.selectProfile = function () {
        var _this = this;
        if (this.profiles === null || this.profiles === undefined)
            return;
        if (this.profiles.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new saletarget_1.SaleTarget();
            this.item.agent = this.profiles.filter(function (profile) { return profile.id === _this.item.agent.id; })[0];
        }
    }; //fin selectProfile
    //get list of profiles
    SaletargetUpdateComponent.prototype.getProfiles = function () {
        var _this = this;
        this.profiles = [];
        this.profileService.getProfiles(this.user)
            .then(function (profiles) {
            _this.profiles = profiles;
            _this.selectProfile();
        }, function (error) {
        });
    }; //fin getProfiles
    //start date
    SaletargetUpdateComponent.prototype.getSelectedDateStart = function (dateStart) {
        var format = new Date(dateStart);
        this.item.start_date = format;
    }; //fin getSelectedDateStart
    //end date
    SaletargetUpdateComponent.prototype.getSelectedDateEnd = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.item.end_date = format;
    }; //fin getSelectedDateEnd
    //Enregistrement réussie
    SaletargetUpdateComponent.prototype.successSwal = function () {
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
    SaletargetUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    SaletargetUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], SaletargetUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], SaletargetUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], SaletargetUpdateComponent.prototype, "updated");
    SaletargetUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-saletarget-update',
            templateUrl: './saletarget-update.component.html',
            styleUrls: ['./saletarget-update.component.scss']
        })
    ], SaletargetUpdateComponent);
    return SaletargetUpdateComponent;
}());
exports.SaletargetUpdateComponent = SaletargetUpdateComponent;

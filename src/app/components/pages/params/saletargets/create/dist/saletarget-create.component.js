"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaletargetCreateComponent = void 0;
var core_1 = require("@angular/core");
var saletarget_1 = require("src/app/shared/models/saletarget/saletarget");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var SaletargetCreateComponent = /** @class */ (function () {
    function SaletargetCreateComponent(router, activeModal, saleTargetService, profileService, libraryService, locStorService, route) {
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
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    SaletargetCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new saletarget_1.SaleTarget();
        this.getProfiles();
    };
    SaletargetCreateComponent.prototype.ngOnChanges = function () {
        this.item = new saletarget_1.SaleTarget();
    }; //end ngOnChanges
    //create object
    SaletargetCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.saleTargetService.createSaleTarget(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new saletarget_1.SaleTarget();
            _this.created.emit("created");
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
    SaletargetCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    SaletargetCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new saletarget_1.SaleTarget();
    };
    //get list of profiles
    SaletargetCreateComponent.prototype.getProfiles = function () {
        var _this = this;
        this.profiles = [];
        this.profileService.getProfiles(this.user)
            .then(function (profiles) {
            _this.profiles = profiles;
        }, function (error) {
        });
    }; //fin getProfiles
    //start date
    SaletargetCreateComponent.prototype.getSelectedDateStart = function (dateStart) {
        var format = new Date(dateStart);
        this.item.start_date = format;
        // if (this.item.end_date < this.item.start_date) {
        //   this.error_date = true;
        // } else {
        //   this.error_date = false;
        // }
    }; //fin getSelectedDateStart
    //end date
    SaletargetCreateComponent.prototype.getSelectedDateEnd = function (dateEnd) {
        var format = new Date(dateEnd);
        format.setHours(23, 59, 59, 999);
        this.item.end_date = format;
        if (format < this.item.start_date) {
            this.error_date = true;
        }
        else {
            this.error_date = false;
        }
    }; //fin getSelectedDateEnd
    //Enregistrement réussie
    SaletargetCreateComponent.prototype.successSwal = function () {
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
    SaletargetCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    SaletargetCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    SaletargetCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("date_debut").focus();
    };
    __decorate([
        core_1.Input()
    ], SaletargetCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], SaletargetCreateComponent.prototype, "created");
    SaletargetCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-saletarget-create',
            templateUrl: './saletarget-create.component.html',
            styleUrls: ['./saletarget-create.component.scss']
        })
    ], SaletargetCreateComponent);
    return SaletargetCreateComponent;
}());
exports.SaletargetCreateComponent = SaletargetCreateComponent;

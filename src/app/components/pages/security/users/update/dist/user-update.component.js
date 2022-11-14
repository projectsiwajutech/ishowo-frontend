"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserUpdateComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var UserUpdateComponent = /** @class */ (function () {
    function UserUpdateComponent(router, activeModal, userService, route, libraryService) {
        this.router = router;
        this.activeModal = activeModal;
        this.userService = userService;
        this.route = route;
        this.libraryService = libraryService;
        this.show = false;
        this.visible = false;
        this.item = null;
        this.Indicatif = "+229";
        this.Indicatif1 = "+229";
        this.Indicatif2 = "+228";
        this.phoneValid = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.updated = new core_1.EventEmitter();
        //phone number format
        this.maskMobileNo = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    }
    UserUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    UserUpdateComponent.prototype.ngOnChanges = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //create object
    UserUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.phone = form.indicatif + ' ' + form.phone;
        this.userService.updateAgent(this.item)
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
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    UserUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //check phone number
    UserUpdateComponent.prototype.checkPhoneNumber = function (phone) {
        this.phoneValid = false;
        var count = 0;
        var pos = phone.indexOf("_");
        while (pos != -1) {
            count++;
            pos = phone.indexOf("_", pos + 1);
        }
        if (count > 0 || phone === "") {
            this.phoneValid = false;
        }
        else {
            var filterOne = phone.replaceAll('-', '');
            var filterTwo = filterOne.replaceAll(' ', '');
            var ckeckResponse = this.libraryService.checkPhoneNumber(filterTwo);
            switch (ckeckResponse) {
                case true:
                    return this.phoneValid = true;
                    break;
                case false:
                    return this.phoneValid = false;
                    break;
                default:
                    return this.phoneValid = false;
                    break;
            }
        }
    }; //fin check phone number
    //format Phone Number
    UserUpdateComponent.prototype.formatPhoneNumber = function (phone) {
        var format = this.libraryService.formatPhoneNumber(phone);
        return format;
    }; //fin format Phone Number
    //Enregistrement réussie
    UserUpdateComponent.prototype.successSwal = function () {
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
    UserUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    UserUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    UserUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("user_name").focus();
    };
    __decorate([
        core_1.Input()
    ], UserUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], UserUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], UserUpdateComponent.prototype, "updated");
    UserUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-user-update',
            templateUrl: './user-update.component.html',
            styleUrls: ['./user-update.component.scss']
        })
    ], UserUpdateComponent);
    return UserUpdateComponent;
}());
exports.UserUpdateComponent = UserUpdateComponent;

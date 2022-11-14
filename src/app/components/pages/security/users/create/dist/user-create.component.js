"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserCreateComponent = void 0;
var core_1 = require("@angular/core");
var user_1 = require("src/app/shared/models/user/user");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var UserCreateComponent = /** @class */ (function () {
    function UserCreateComponent(router, activeModal, userService, locStorService, route, libraryService) {
        this.router = router;
        this.activeModal = activeModal;
        this.userService = userService;
        this.locStorService = locStorService;
        this.route = route;
        this.libraryService = libraryService;
        this.Indicatif = "+229";
        this.Indicatif1 = "+229";
        this.Indicatif2 = "+228";
        this.phoneValid = true;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        //phone number format
        this.maskMobileNo = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    }
    UserCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.item = new user_1.User();
        this.user = this.locStorService.getUser();
    };
    //create object
    UserCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.phone = form.indicatif + ' ' + form.phone;
        this.userService.createAgent(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new user_1.User();
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
    UserCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //check phone number
    UserCreateComponent.prototype.checkPhoneNumber = function (phone) {
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
    //Enregistrement réussie
    UserCreateComponent.prototype.successSwal = function () {
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
    UserCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    UserCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    UserCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("user_name").focus();
    };
    __decorate([
        core_1.Input()
    ], UserCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], UserCreateComponent.prototype, "created");
    UserCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-user-create',
            templateUrl: './user-create.component.html',
            styleUrls: ['./user-create.component.scss']
        })
    ], UserCreateComponent);
    return UserCreateComponent;
}());
exports.UserCreateComponent = UserCreateComponent;

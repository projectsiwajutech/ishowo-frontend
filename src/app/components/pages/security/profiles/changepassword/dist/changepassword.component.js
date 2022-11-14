"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangepasswordComponent = void 0;
var core_1 = require("@angular/core");
var profil_1 = require("src/app/shared/models/profil/profil");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var ChangepasswordComponent = /** @class */ (function () {
    function ChangepasswordComponent(router, activeModal, profileService, locStorService, LibraryService) {
        this.router = router;
        this.activeModal = activeModal;
        this.profileService = profileService;
        this.locStorService = locStorService;
        this.LibraryService = LibraryService;
        this.show = false;
        this.modify = false;
        this.visible = false;
        this.samePassWord = true;
        this.defaultPass = "";
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.agencies = [];
        this.users = [];
        this.groups = [];
        this.updated = new core_1.EventEmitter();
    }
    ChangepasswordComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //create object
    ChangepasswordComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.login = form.new_login;
        this.item.code = form.pass1;
        this.profileService.updateProfile(this.item)
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
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    ChangepasswordComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    ChangepasswordComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //verification du mot de passe
    ChangepasswordComponent.prototype.checkPassword = function (password) {
        var _this = this;
        this.show = true;
        this.profileService.cryptPassword(password).then(function (result) {
            _this.show = false;
            if (result !== _this.item.code) {
                _this.LibraryService.onError('Mot de passe incorrect!', 1300, 'top-end');
            }
            else {
                _this.modify = true;
            }
        });
    }; //verification du mot de passe
    //select a user
    ChangepasswordComponent.prototype.selectUser = function () {
        var _this = this;
        if (this.users === null || this.users === undefined)
            return;
        if (this.users.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new profil_1.Profil();
            this.item.user = this.users.filter(function (user) { return user.id === _this.item.user.id; })[0];
        }
    }; //fin selectUser
    //select a group
    ChangepasswordComponent.prototype.selectGroup = function () {
        var _this = this;
        if (this.groups === null || this.groups === undefined)
            return;
        if (this.groups.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new profil_1.Profil();
            this.item.group = this.groups.filter(function (group) { return group.id === _this.item.group.id; })[0];
        }
    }; //fin selectGroup
    //select a agency
    ChangepasswordComponent.prototype.selectAgency = function () {
        var _this = this;
        if (this.agencies === null || this.agencies === undefined)
            return;
        if (this.agencies.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new profil_1.Profil();
            this.item.agency = this.agencies.filter(function (agency) { return agency.id === _this.item.agency.id; })[0];
        }
    }; //fin selectAgency
    //Enregistrement réussie
    ChangepasswordComponent.prototype.successSwal = function () {
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
    ChangepasswordComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //CheckSamePassword
    ChangepasswordComponent.prototype.CheckSamePassword = function (passOne, passTwo) {
        if (passOne === passTwo) {
            this.samePassWord = true;
        }
        else {
            this.samePassWord = false;
        }
    };
    //fin CheckSamePassword
    //Fermeture
    ChangepasswordComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    ChangepasswordComponent.prototype.onLoadFocus = function () {
        document.getElementById("password").focus();
    };
    //Afficher Masquer le mot de passe
    ChangepasswordComponent.prototype.showHidePass = function () {
        var input = document.getElementById("password");
        if (input.type === "password") {
            input.type = "text";
            this.showPass = true;
        }
        else {
            input.type = "password";
            this.showPass = false;
        }
    };
    //Afficher Masquer le mot de passe
    ChangepasswordComponent.prototype.showHidePassword = function () {
        var input = document.getElementById("pass2");
        if (input.type === "password") {
            input.type = "text";
            this.showPassword = true;
        }
        else {
            input.type = "password";
            this.showPassword = false;
        }
    };
    __decorate([
        core_1.Input()
    ], ChangepasswordComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], ChangepasswordComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ChangepasswordComponent.prototype, "updated");
    ChangepasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-changepassword',
            templateUrl: './changepassword.component.html',
            styleUrls: ['./changepassword.component.scss']
        })
    ], ChangepasswordComponent);
    return ChangepasswordComponent;
}());
exports.ChangepasswordComponent = ChangepasswordComponent;

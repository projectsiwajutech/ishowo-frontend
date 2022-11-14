"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VaccountUpdateComponent = void 0;
var core_1 = require("@angular/core");
var group_1 = require("src/app/shared/models/group/group");
var profil_1 = require("src/app/shared/models/profil/profil");
var user_1 = require("src/app/shared/models/user/user");
var virtualaccount_1 = require("src/app/shared/models/virtualaccount/virtualaccount");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var VaccountUpdateComponent = /** @class */ (function () {
    function VaccountUpdateComponent(router, activeModal, bankService, profilService, vAccountService, libraryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.bankService = bankService;
        this.profilService = profilService;
        this.vAccountService = vAccountService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.banks = [];
        this.profiles = [];
        this.account_types = [];
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.isProfileVisible = false;
        this.isBankVisible = false;
        this.updated = new core_1.EventEmitter();
    }
    VaccountUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.toogleItemsVisibility();
        this.getBanks();
        this.getProfiles();
        this.getAccountTypes();
        this.getBanks();
    };
    VaccountUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        if (this.account_types.length !== 0) {
            this.selectAccountType();
        }
        else {
            this.getAccountTypes();
        }
        if (this.banks.length !== 0) {
            this.selectBank();
        }
        else {
            this.getBanks();
        }
        if (this.profiles.length !== 0) {
            this.selectProfile();
        }
        else {
            this.getProfiles();
        }
    }; //end ngOnChanges
    //create object
    VaccountUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.vAccountService.updateVirtualAccount(this.item)
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
            _this.statusMessage = _this.libraryService.getServiceErrorText(error);
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    VaccountUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    VaccountUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //select an account type
    VaccountUpdateComponent.prototype.selectAccountType = function () {
        var _this = this;
        if (this.account_types === null || this.account_types === undefined)
            return;
        if (this.account_types.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new virtualaccount_1.VirtualAccount();
            this.item.account_type = this.account_types.filter(function (account_type) { return account_type.id === _this.item.account_type.id; })[0];
        }
    }; //fin selectAccountType
    //get list of account types
    VaccountUpdateComponent.prototype.getAccountTypes = function () {
        var _this = this;
        this.account_types = [];
        this.vAccountService.getAccountTypes(this.user)
            .then(function (account_types) {
            _this.account_types = account_types;
            _this.selectAccountType();
        }, function (error) {
        });
    }; //fin getAccountTypes
    //select a bank
    VaccountUpdateComponent.prototype.selectBank = function () {
        var _this = this;
        if (this.banks === null || this.banks === undefined)
            return;
        if (this.banks.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new virtualaccount_1.VirtualAccount();
            if (this.item.bank !== null) {
                this.item.bank = this.banks.filter(function (bank) { return bank.id === _this.item.bank.id; })[0];
            }
        }
    }; //fin selectBank
    //get list of banks
    VaccountUpdateComponent.prototype.getBanks = function () {
        var _this = this;
        this.banks = [];
        this.bankService.getBanks(this.user)
            .then(function (banks) {
            _this.banks = banks;
            _this.selectBank();
        }, function (error) {
        });
    }; //fin getBanks
    //select a profile
    VaccountUpdateComponent.prototype.selectProfile = function () {
        var _this = this;
        if (this.profiles === null || this.profiles === undefined)
            return;
        if (this.profiles.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new virtualaccount_1.VirtualAccount();
            if (this.item.beneficiaire !== null) {
                this.item.beneficiaire = this.profiles.filter(function (profile) { return profile.id === _this.item.beneficiaire.id; })[0];
            }
        }
    }; //fin selectProfile
    //get list of profiles
    VaccountUpdateComponent.prototype.getProfiles = function () {
        var _this = this;
        this.profiles = [];
        this.profilService.getProfiles(this.user)
            .then(function (profiles) {
            var emptyProfile = new profil_1.Profil();
            emptyProfile.user = new user_1.User();
            emptyProfile.user.firstname = "ENTREPRISE";
            emptyProfile.user.lastname = "";
            emptyProfile.group = new group_1.Group();
            emptyProfile.group.name = "ENTREPRISE";
            emptyProfile.login = "AUCUN";
            profiles.push(emptyProfile);
            _this.profiles = profiles;
        }, function (error) {
        });
    }; //fin getProfiles
    //toogle profile visibility
    VaccountUpdateComponent.prototype.toogleItemsVisibility = function () {
        if (this.item === undefined)
            return;
        var accountType = this.item.account_type.name.toLowerCase();
        switch (accountType) {
            case "caisse":
                this.isBankVisible = false;
                this.isProfileVisible = true;
                this.item.bank = null;
                break;
            case "bancaire":
                this.isBankVisible = true;
                this.isProfileVisible = false;
                this.item.beneficiaire = null;
                break;
            default:
                this.isBankVisible = false;
                this.isProfileVisible = false;
                this.item.bank = null;
                this.item.beneficiaire = null;
                break;
        }
    }; //fin toogleItemsVisibility
    //Enregistrement réussie
    VaccountUpdateComponent.prototype.successSwal = function () {
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
    VaccountUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    VaccountUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    VaccountUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("intitule_name").focus();
    };
    __decorate([
        core_1.Input()
    ], VaccountUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], VaccountUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], VaccountUpdateComponent.prototype, "updated");
    VaccountUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-vaccount-update',
            templateUrl: './vaccount-update.component.html',
            styleUrls: ['./vaccount-update.component.scss']
        })
    ], VaccountUpdateComponent);
    return VaccountUpdateComponent;
}());
exports.VaccountUpdateComponent = VaccountUpdateComponent;

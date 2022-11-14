"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VaccountCreateComponent = void 0;
var core_1 = require("@angular/core");
var group_1 = require("src/app/shared/models/group/group");
var profil_1 = require("src/app/shared/models/profil/profil");
var user_1 = require("src/app/shared/models/user/user");
var virtualaccount_1 = require("src/app/shared/models/virtualaccount/virtualaccount");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var VaccountCreateComponent = /** @class */ (function () {
    function VaccountCreateComponent(router, activeModal, vAccountService, bankService, profilService, libraryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.vAccountService = vAccountService;
        this.bankService = bankService;
        this.profilService = profilService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isProfileVisible = false;
        this.isBankVisible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    VaccountCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new virtualaccount_1.VirtualAccount();
        this.getAccountTypes();
        this.getBanks();
        this.getProfiles();
    };
    VaccountCreateComponent.prototype.ngOnChanges = function () {
        this.item = new virtualaccount_1.VirtualAccount();
    }; //end ngOnChanges
    //create object
    VaccountCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.vAccountService.createVirtualAccount(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            if (result === null) {
                _this.isSuccess = false;
                _this.statusMessage = _this.libraryService.getServiceErrorText("Une erreur est survenue");
                return;
            }
            // /this.item = result;
            _this.visible = false;
            _this.isSuccess = true;
            _this.item = new virtualaccount_1.VirtualAccount();
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
    }; //fin save
    //show creation form
    VaccountCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    VaccountCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new virtualaccount_1.VirtualAccount();
    };
    //get list of account types
    VaccountCreateComponent.prototype.getAccountTypes = function () {
        var _this = this;
        this.account_types = [];
        this.vAccountService.getAccountTypes(this.user)
            .then(function (account_types) {
            _this.account_types = account_types;
        }, function (error) {
        });
    }; //fin getAccountTypes
    //get list of banks
    VaccountCreateComponent.prototype.getBanks = function () {
        var _this = this;
        this.banks = [];
        this.bankService.getBanks(this.user)
            .then(function (banks) {
            _this.banks = banks;
        }, function (error) {
        });
    }; //fin getBanks
    //get list of profiles
    VaccountCreateComponent.prototype.getProfiles = function () {
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
    VaccountCreateComponent.prototype.toogleItemsVisibility = function () {
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
    VaccountCreateComponent.prototype.successSwal = function () {
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
    VaccountCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    VaccountCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    VaccountCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("intitule_name").focus();
    };
    __decorate([
        core_1.Input()
    ], VaccountCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], VaccountCreateComponent.prototype, "created");
    VaccountCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-vaccount-create',
            templateUrl: './vaccount-create.component.html',
            styleUrls: ['./vaccount-create.component.scss']
        })
    ], VaccountCreateComponent);
    return VaccountCreateComponent;
}());
exports.VaccountCreateComponent = VaccountCreateComponent;

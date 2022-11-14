"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileUpdateComponent = void 0;
var core_1 = require("@angular/core");
var profil_1 = require("src/app/shared/models/profil/profil");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var ProfileUpdateComponent = /** @class */ (function () {
    function ProfileUpdateComponent(router, activeModal, profileService, locStorService, agencyService, userService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.profileService = profileService;
        this.locStorService = locStorService;
        this.agencyService = agencyService;
        this.userService = userService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.agencies = [];
        this.users = [];
        this.groups = [];
        this.updated = new core_1.EventEmitter();
    }
    ProfileUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.getUsers();
        this.getAgencies();
        this.getGroups();
    };
    ProfileUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        if (this.users.length !== 0) {
            this.selectUser();
        }
        else {
            this.getUsers();
        }
        if (this.groups.length !== 0) {
            this.selectGroup();
        }
        else {
            this.getGroups();
        }
        if (this.agencies.length !== 0) {
            this.selectAgency();
        }
        else {
            this.getAgencies();
        }
    }; //end ngOnChanges
    //create object
    ProfileUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
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
    ProfileUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    ProfileUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //select a user
    ProfileUpdateComponent.prototype.selectUser = function () {
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
    ProfileUpdateComponent.prototype.selectGroup = function () {
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
    ProfileUpdateComponent.prototype.selectAgency = function () {
        var _this = this;
        if (this.agencies === null || this.agencies === undefined)
            return;
        if (this.agencies.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new profil_1.Profil();
            this.item.agency = this.agencies.filter(function (agency) { return agency.id === _this.item.agency.id; })[0];
        }
    }; //fin selectAgency
    //get list of agencies
    ProfileUpdateComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            _this.agencies = agencies;
            _this.selectAgency();
        }, function (error) {
        });
    }; //fin getAgencies
    //get list of users
    ProfileUpdateComponent.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.userService.getAgents(this.user)
            .then(function (users) {
            _this.users = users;
            _this.selectUser();
        }, function (error) {
        });
    }; //fin getUsers
    //get list of groups
    ProfileUpdateComponent.prototype.getGroups = function () {
        var _this = this;
        this.groups = [];
        this.userService.getGroupsList()
            .then(function (groups) {
            _this.groups = groups;
            _this.selectGroup();
        }, function (error) {
        });
    }; //fin getGroups
    //Enregistrement réussie
    ProfileUpdateComponent.prototype.successSwal = function () {
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
    ProfileUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    ProfileUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    ProfileUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("user_name").focus();
    };
    __decorate([
        core_1.Input()
    ], ProfileUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], ProfileUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProfileUpdateComponent.prototype, "updated");
    ProfileUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-update',
            templateUrl: './profile-update.component.html',
            styleUrls: ['./profile-update.component.scss']
        })
    ], ProfileUpdateComponent);
    return ProfileUpdateComponent;
}());
exports.ProfileUpdateComponent = ProfileUpdateComponent;

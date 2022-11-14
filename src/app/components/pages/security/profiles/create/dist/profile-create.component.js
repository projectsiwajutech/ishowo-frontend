"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileCreateComponent = void 0;
var core_1 = require("@angular/core");
var profil_1 = require("src/app/shared/models/profil/profil");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var ProfileCreateComponent = /** @class */ (function () {
    function ProfileCreateComponent(router, activeModal, profilService, locStorService, agencyService, userService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.profilService = profilService;
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
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    ProfileCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new profil_1.Profil();
        this.getAgencies();
        this.getUsers();
        this.getGroups();
    };
    ProfileCreateComponent.prototype.ngOnChanges = function () {
        this.item = new profil_1.Profil();
    }; //end ngOnChanges
    //create object
    ProfileCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.agent = this.user;
        this.item.login = form.login;
        this.item.code = form.code;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.profilService.createProfile(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            // /this.item = result;
            _this.item = new profil_1.Profil();
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
    ProfileCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    ProfileCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new profil_1.Profil();
    };
    //get list of agencies
    ProfileCreateComponent.prototype.getAgencies = function () {
        var _this = this;
        this.agencies = [];
        this.agencyService.getAgencies(this.user)
            .then(function (agencies) {
            _this.agencies = agencies;
        }, function (error) {
        });
    }; //fin getAgencies
    //get list of users
    ProfileCreateComponent.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        this.userService.getAgents(this.user)
            .then(function (users) {
            _this.users = users;
        }, function (error) {
        });
    }; //fin getUsers
    //get list of groups
    ProfileCreateComponent.prototype.getGroups = function () {
        var _this = this;
        this.groups = [];
        this.userService.getGroupsList()
            .then(function (groups) {
            _this.groups = groups;
        }, function (error) {
        });
    }; //fin getGroups
    //Enregistrement réussie
    ProfileCreateComponent.prototype.successSwal = function () {
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
    ProfileCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    ProfileCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    ProfileCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("user_name").focus();
    };
    __decorate([
        core_1.Input()
    ], ProfileCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProfileCreateComponent.prototype, "created");
    ProfileCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-create',
            templateUrl: './profile-create.component.html',
            styleUrls: ['./profile-create.component.scss']
        })
    ], ProfileCreateComponent);
    return ProfileCreateComponent;
}());
exports.ProfileCreateComponent = ProfileCreateComponent;

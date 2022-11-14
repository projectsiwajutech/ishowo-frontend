"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilesComponent = void 0;
var core_1 = require("@angular/core");
var changepassword_component_1 = require("../changepassword/changepassword.component");
var profile_create_component_1 = require("../create/profile-create.component");
var profile_delete_component_1 = require("../delete/profile-delete.component");
var profile_update_component_1 = require("../update/profile-update.component");
var ProfilesComponent = /** @class */ (function () {
    function ProfilesComponent(modalService, constantService, profileService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.profileService = profileService;
        this.locStorService = locStorService;
        this.route = route;
        this.profiles = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    ProfilesComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getProfiles();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of profiles
    ProfilesComponent.prototype.getProfiles = function () {
        var _this = this;
        this.isLoading = true;
        this.profiles = [];
        this.profileService.getProfiles(this.user)
            .then(function (profiles) {
            _this.isLoading = false;
            if (profiles.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.profiles = profiles;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getProfiles
    //track by
    ProfilesComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    ProfilesComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(profile_create_component_1.ProfileCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    ProfilesComponent.prototype.deleteModal = function (agency) {
        var modalRef = this.modalService.open(profile_delete_component_1.ProfileDeleteComponent);
        modalRef.componentInstance.item = agency;
    }; // end createModal
    //modal de mis-à-jour
    ProfilesComponent.prototype.updateModal = function (agency) {
        var modalRef = this.modalService.open(profile_update_component_1.ProfileUpdateComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    //modal de mis-à-jour
    ProfilesComponent.prototype.changePassModal = function (agency) {
        var modalRef = this.modalService.open(changepassword_component_1.ChangepasswordComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    ProfilesComponent = __decorate([
        core_1.Component({
            selector: 'app-profiles',
            templateUrl: './profiles.component.html',
            styleUrls: ['./profiles.component.scss']
        })
    ], ProfilesComponent);
    return ProfilesComponent;
}());
exports.ProfilesComponent = ProfilesComponent;

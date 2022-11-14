"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersComponent = void 0;
var core_1 = require("@angular/core");
var user_create_component_1 = require("../create/user-create.component");
var user_delete_component_1 = require("../delete/user-delete.component");
var user_update_component_1 = require("../update/user-update.component");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(modalService, constantService, userService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.userService = userService;
        this.locStorService = locStorService;
        this.route = route;
        this.agents = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getUsers();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of users
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.isLoading = true;
        this.agents = [];
        this.userService.getAgents(this.user)
            .then(function (agents) {
            _this.isLoading = false;
            if (agents.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.agents = agents;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getUsers
    //track by
    UsersComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    UsersComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(user_create_component_1.UserCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    UsersComponent.prototype.deleteModal = function (agency) {
        var modalRef = this.modalService.open(user_delete_component_1.UserDeleteComponent);
        modalRef.componentInstance.item = agency;
    }; // end createModal
    //modal de mis-à-jour
    UsersComponent.prototype.updateModal = function (agency) {
        var modalRef = this.modalService.open(user_update_component_1.UserUpdateComponent);
        modalRef.componentInstance.item = agency;
    }; //fin updateModal
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.scss']
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;

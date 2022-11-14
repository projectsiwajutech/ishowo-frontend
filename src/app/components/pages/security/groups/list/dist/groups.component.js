"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupsComponent = void 0;
var core_1 = require("@angular/core");
var group_create_component_1 = require("../create/group-create.component");
var group_update_component_1 = require("../update/group-update.component");
var group_view_component_1 = require("../view/group-view.component");
var GroupsComponent = /** @class */ (function () {
    function GroupsComponent(modalService, userService, locStorService) {
        this.modalService = modalService;
        this.userService = userService;
        this.locStorService = locStorService;
        this.groups = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    GroupsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getGroups();
    };
    //get list of groups
    GroupsComponent.prototype.getGroups = function () {
        var _this = this;
        this.isLoading = true;
        this.groups = [];
        this.userService.getGroups()
            .then(function (groups) {
            _this.isLoading = false;
            if (groups.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.groups = groups;
            _this.TOTAL = _this.groups.length;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getGroups
    //track by
    GroupsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    GroupsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(group_create_component_1.GroupCreateComponent, { size: 'xl' });
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    GroupsComponent.prototype.updateModal = function (group) {
        var modalRef = this.modalService.open(group_update_component_1.GroupUpdateComponent, { size: 'xl' });
        modalRef.componentInstance.handler = group;
    }; //fin updateModal
    //modal de détails
    GroupsComponent.prototype.viewModal = function (group) {
        var modalRef = this.modalService.open(group_view_component_1.GroupViewComponent, { size: 'xl' });
        modalRef.componentInstance.handler = group;
    }; //fin viewModal
    GroupsComponent = __decorate([
        core_1.Component({
            selector: 'app-groups',
            templateUrl: './groups.component.html',
            styleUrls: ['./groups.component.scss']
        })
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;

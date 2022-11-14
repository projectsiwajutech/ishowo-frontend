"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupCreateComponent = void 0;
var core_1 = require("@angular/core");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var group_1 = require("src/app/shared/models/group/group");
var GroupCreateComponent = /** @class */ (function () {
    function GroupCreateComponent(router, activeModal, userService, locStorService) {
        this.router = router;
        this.activeModal = activeModal;
        this.userService = userService;
        this.locStorService = locStorService;
        this.show = false;
        this.roles = [];
        this.noData = false;
        this.isLoading = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    GroupCreateComponent.prototype.ngOnInit = function () {
        this.item = new group_1.Group();
        this.getRoles();
        this.user = this.locStorService.getUser();
    };
    //save group
    GroupCreateComponent.prototype.saveGroup = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.name = form.name_groupe;
        this.item.reference = form.name_groupe;
        this.item.total_laws = 0;
        this.userService.createGroup(this.item, this.roles, this.user)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new group_1.Group();
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
    //fin saveGroup
    //get list of users
    GroupCreateComponent.prototype.getRoles = function () {
        var _this = this;
        this.isLoading = true;
        this.roles = [];
        this.userService.getRoles()
            .then(function (roles) {
            _this.isLoading = false;
            if (roles.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.roles = roles.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getUsers
    //OnchangeRole Status
    GroupCreateComponent.prototype.OnchangeStatut = function (item) {
        var role = this.roles.filter(function (prod) { return prod.id == item.id; })[0];
        if (role.ischecked == false) {
            role.ischecked = true;
        }
        else if (role.ischecked == true) {
            role.ischecked = false;
        }
    }; //fin OnchangeRole Status
    //Enregistrement réussie
    GroupCreateComponent.prototype.successSwal = function () {
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
    GroupCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //close Modal
    GroupCreateComponent.prototype.close = function () {
        this.activeModal.close();
    };
    __decorate([
        core_1.Input()
    ], GroupCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], GroupCreateComponent.prototype, "created");
    GroupCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-group-create',
            templateUrl: './group-create.component.html',
            styleUrls: ['./group-create.component.scss']
        })
    ], GroupCreateComponent);
    return GroupCreateComponent;
}());
exports.GroupCreateComponent = GroupCreateComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupUpdateComponent = void 0;
var core_1 = require("@angular/core");
var group_1 = require("src/app/shared/models/group/group");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var GroupUpdateComponent = /** @class */ (function () {
    function GroupUpdateComponent(router, activeModal, userService, locStorService, route, libraryService, profilService) {
        this.router = router;
        this.activeModal = activeModal;
        this.userService = userService;
        this.locStorService = locStorService;
        this.route = route;
        this.libraryService = libraryService;
        this.profilService = profilService;
        this.show = false;
        this.noData = false;
        this.isLoading = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    GroupUpdateComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.handler.laws = this.handler.laws.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
    };
    //save group
    GroupUpdateComponent.prototype.updateGroup = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.handler.group.name = form.name_groupe;
        this.handler.group.reference = form.name_groupe;
        this.userService.updateGroup(this.handler.group, this.handler.laws, this.user)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new group_1.Group();
            _this.created.emit("created");
            _this.show = false;
            _this.activeModal.close();
            _this.updateGroupLocalStor();
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
    //OnchangeRole Status
    GroupUpdateComponent.prototype.OnchangeStatut = function (item) {
        var role = this.handler.laws.filter(function (prod) { return prod.id == item.id; })[0];
        if (role.ischecked == false) {
            role.ischecked = true;
        }
        else if (role.ischecked == true) {
            role.ischecked = false;
        }
    }; // fin OnchangeRole Status
    //Enregistrement réussie
    GroupUpdateComponent.prototype.successSwal = function () {
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
    GroupUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //close Modal
    GroupUpdateComponent.prototype.close = function () {
        this.activeModal.close();
    };
    //fin close
    GroupUpdateComponent.prototype.updateGroupLocalStor = function () {
        var _this = this;
        this.user = this.locStorService.getUser();
        this.profilService.getGroupRoles(this.user.group)
            .then(function (result) {
            _this.locStorService.saveGroup(result);
        }, function (error) {
            if (error.status === 400) {
                _this.libraryService.onError(error._body, 2000, 'top-start');
                return;
            }
        });
    };
    __decorate([
        core_1.Input()
    ], GroupUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], GroupUpdateComponent.prototype, "created");
    GroupUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-group-update',
            templateUrl: './group-update.component.html',
            styleUrls: ['./group-update.component.scss']
        })
    ], GroupUpdateComponent);
    return GroupUpdateComponent;
}());
exports.GroupUpdateComponent = GroupUpdateComponent;

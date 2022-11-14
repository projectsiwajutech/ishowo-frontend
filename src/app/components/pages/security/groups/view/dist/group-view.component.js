"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupViewComponent = void 0;
var core_1 = require("@angular/core");
var GroupViewComponent = /** @class */ (function () {
    function GroupViewComponent(activeModal, locStorService) {
        this.activeModal = activeModal;
        this.locStorService = locStorService;
        this.show = false;
        this.noData = false;
        this.isLoading = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    GroupViewComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.handler.laws = this.handler.laws.sort(function (a, b) { return (a.id > b.id ? 1 : -1); });
    };
    //close Modal
    GroupViewComponent.prototype.close = function () {
        this.activeModal.close();
    };
    __decorate([
        core_1.Input()
    ], GroupViewComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], GroupViewComponent.prototype, "created");
    GroupViewComponent = __decorate([
        core_1.Component({
            selector: 'app-group-view',
            templateUrl: './group-view.component.html',
            styleUrls: ['./group-view.component.scss']
        })
    ], GroupViewComponent);
    return GroupViewComponent;
}());
exports.GroupViewComponent = GroupViewComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaveModalComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var SaveModalComponent = /** @class */ (function () {
    function SaveModalComponent(router, activeModal, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.route = route;
        this.item = 0;
        this.show = false;
        this.visible = false;
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
    }
    SaveModalComponent.prototype.ngOnInit = function () {
    };
    SaveModalComponent.prototype.ngOnChanges = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //create object
    SaveModalComponent.prototype["delete"] = function () {
        this.show = true;
        this.isDeleting = true;
        this.isCompleted = false;
        this.statusMessage = "";
    };
    //show creation form
    SaveModalComponent.prototype.showCreationForm = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    SaveModalComponent.prototype.hideForm = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //Suppression réussie
    SaveModalComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Suppression réussie!',
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
    //Echec de la Suppression
    SaveModalComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de la Suppression!', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    SaveModalComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], SaveModalComponent.prototype, "item");
    SaveModalComponent = __decorate([
        core_1.Component({
            selector: 'app-save-modal',
            templateUrl: './save-modal.component.html',
            styleUrls: ['./save-modal.component.scss']
        })
    ], SaveModalComponent);
    return SaveModalComponent;
}());
exports.SaveModalComponent = SaveModalComponent;

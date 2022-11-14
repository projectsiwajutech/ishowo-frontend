"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryDeleteComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var CategoryDeleteComponent = /** @class */ (function () {
    function CategoryDeleteComponent(router, activeModal, categoryService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.categoryService = categoryService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.item = null;
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.deleted = new core_1.EventEmitter();
    }
    CategoryDeleteComponent.prototype.ngOnInit = function () {
        //this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
    };
    CategoryDeleteComponent.prototype.ngOnChanges = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //create object
    CategoryDeleteComponent.prototype["delete"] = function () {
        var _this = this;
        this.show = true;
        this.isDeleting = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.categoryService.deleteCategory(this.item.id)
            .then(function (result) {
            _this.isDeleting = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = null;
            ;
            _this.deleted.emit("deleted");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isDeleting = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    CategoryDeleteComponent.prototype.showCreationForm = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    CategoryDeleteComponent.prototype.hideForm = function () {
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //Suppression réussie
    CategoryDeleteComponent.prototype.successSwal = function () {
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
    CategoryDeleteComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de la Suppression!', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    CategoryDeleteComponent.prototype.close = function () {
        this.deleted.emit("updated");
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], CategoryDeleteComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], CategoryDeleteComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CategoryDeleteComponent.prototype, "deleted");
    CategoryDeleteComponent = __decorate([
        core_1.Component({
            selector: 'app-category-delete',
            templateUrl: './category-delete.component.html',
            styleUrls: ['./category-delete.component.scss']
        })
    ], CategoryDeleteComponent);
    return CategoryDeleteComponent;
}());
exports.CategoryDeleteComponent = CategoryDeleteComponent;

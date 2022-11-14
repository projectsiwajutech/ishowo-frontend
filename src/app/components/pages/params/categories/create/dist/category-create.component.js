"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryCreateComponent = void 0;
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var core_1 = require("@angular/core");
var KEY_CODE_1 = require("src/app/shared/models/browser/KEY_CODE");
var category_1 = require("src/app/shared/models/category/category");
var CategoryCreateComponent = /** @class */ (function () {
    function CategoryCreateComponent(router, activeModal, categoryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.categoryService = categoryService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    CategoryCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
    };
    //create object
    CategoryCreateComponent.prototype.save = function (form) {
        var _this = this;
        var data = { "name": form.name };
        this.item = new category_1.Category();
        this.item.name = form.name;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.categoryService.createCategory(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = result;
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
    CategoryCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    CategoryCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
    };
    CategoryCreateComponent.prototype.keyEvent = function (event) {
        if (event.keyCode === KEY_CODE_1.KEY_CODE.ADD) {
            this.showCreationForm();
        }
        if (event.keyCode === KEY_CODE_1.KEY_CODE.ESC) {
            this.hideForm();
        }
    };
    //Enregistrement réussie
    CategoryCreateComponent.prototype.successSwal = function () {
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
    CategoryCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    CategoryCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    CategoryCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("category_name").focus();
    };
    __decorate([
        core_1.Input()
    ], CategoryCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CategoryCreateComponent.prototype, "created");
    __decorate([
        core_1.HostListener('window:keyup', ['$event'])
    ], CategoryCreateComponent.prototype, "keyEvent");
    CategoryCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-category-create',
            templateUrl: './category-create.component.html',
            styleUrls: ['./category-create.component.scss']
        })
    ], CategoryCreateComponent);
    return CategoryCreateComponent;
}());
exports.CategoryCreateComponent = CategoryCreateComponent;

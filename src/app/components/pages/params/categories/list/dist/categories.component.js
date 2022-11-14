"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesComponent = void 0;
var core_1 = require("@angular/core");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var category_update_component_1 = require("../update/category-update.component");
var category_create_component_1 = require("../create/category-create.component");
var category_delete_component_1 = require("../delete/category-delete.component");
var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(modalService, constantService, categoryService, locStorService, route, location, libraryService) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.categoryService = categoryService;
        this.locStorService = locStorService;
        this.route = route;
        this.location = location;
        this.libraryService = libraryService;
        this.categories = [];
        this.page = 1;
        this.pageSize = 30;
        this.isCreateVisible = false;
        this.isLoading = false;
        this.param = new ProductParam_1.ProductParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.dtOptions = this.constantService.DtOptions;
        this.user = this.locStorService.getUser();
        this.getCategories();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of categories
    CategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        this.isLoading = true;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            _this.isLoading = false;
            if (categories.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.categories = categories;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getCategories
    //track by
    CategoriesComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    CategoriesComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(category_create_component_1.CategoryCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de suppression
    CategoriesComponent.prototype.deleteModal = function (category) {
        var modalRef = this.modalService.open(category_delete_component_1.CategoryDeleteComponent);
        modalRef.componentInstance.item = category;
    }; // end createModal
    //modal de mis-à-jour
    CategoriesComponent.prototype.updateModal = function (category) {
        var modalRef = this.modalService.open(category_update_component_1.CategoryUpdateComponent);
        modalRef.componentInstance.item = category;
    }; //fin updateModal
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'app-categories',
            templateUrl: './categories.component.html',
            styleUrls: ['./categories.component.scss']
        })
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;

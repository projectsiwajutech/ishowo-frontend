"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductUpdateComponent = void 0;
var core_1 = require("@angular/core");
var product_1 = require("src/app/shared/models/product/product");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var ProductUpdateComponent = /** @class */ (function () {
    function ProductUpdateComponent(router, activeModal, productService, categoryService, measureTypeService, locStorService) {
        this.router = router;
        this.activeModal = activeModal;
        this.productService = productService;
        this.categoryService = categoryService;
        this.measureTypeService = measureTypeService;
        this.locStorService = locStorService;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.areMeasureTypeAssociationsValid = false;
        this.categories = [];
        this.measureTypes = [];
        this.updated = new core_1.EventEmitter();
    }
    ProductUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.getCategories();
    };
    ProductUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        if (this.categories.length !== 0) {
            this.selectCategory();
        }
        else {
            this.getCategories();
        }
        if (this.measureTypes.length !== 0) { }
        else {
            this.getMeasureTypes();
        }
    }; //end ngOnChanges
    //create object
    ProductUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.reference = this.item.reference + "";
        this.productService.updateProduct(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = null;
            _this.updated.emit("updated");
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
    }; //fin save
    //show creation form
    ProductUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    ProductUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //select a product
    ProductUpdateComponent.prototype.selectCategory = function () {
        var _this = this;
        if (this.categories === null || this.categories === undefined)
            return;
        if (this.categories.length !== 0) {
            if (this.item === null || this.item === undefined)
                this.item = new product_1.Product();
            this.item.category = this.categories.filter(function (category) { return category.id === _this.item.category.id; })[0];
        }
    }; //fin selectCategory
    //get list of categories
    ProductUpdateComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            _this.categories = categories;
            _this.selectCategory();
        }, function (error) {
        });
    }; //fin getCategories
    //get list of measuretypes
    ProductUpdateComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measuretypes) {
            _this.measureTypes = measuretypes;
        }, function (error) {
        });
    }; //fin getMeasureTypes
    //can save product
    ProductUpdateComponent.prototype.canSaveProd = function () {
        var stateProductName = (this.item.name === null || this.item.name === undefined || this.item.name === "");
        var stateProductCategory = (this.item.category === null || this.item.category === undefined);
        var stateMeasureType = (this.item.measure_types === undefined || this.item.measure_types.length === 0);
        //let stateMeasureTypeAssociations: boolean = (this.item.measure_associations === undefined || this.item.measure_associations.length === 0 );
        var stateMeasureTypeAssociationsValid = (this.item.measure_associations !== undefined && this.item.measure_associations.length !== 0 && this.areMeasureTypeAssociationsValid === false);
        if (stateProductName === true || stateProductCategory === true || stateMeasureType === true
            || stateMeasureTypeAssociationsValid === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canAddProd
    //on list change event
    ProductUpdateComponent.prototype.onListChanged = function (event) {
        this.item.measure_associations = event;
    }; //fin onListChanged
    //on list validity check event
    ProductUpdateComponent.prototype.onListChecked = function (event) {
        this.areMeasureTypeAssociationsValid = event;
    }; //fin onListChecked
    //on measure types list change
    ProductUpdateComponent.prototype.onMeasureTypeListChanged = function (event) {
        this.item.measure_types = event;
    };
    //Enregistrement réussie
    ProductUpdateComponent.prototype.successSwal = function () {
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
    ProductUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    ProductUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    ProductUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("product_name").focus();
    };
    __decorate([
        core_1.Input()
    ], ProductUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], ProductUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProductUpdateComponent.prototype, "updated");
    ProductUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-product-update',
            templateUrl: './product-update.component.html',
            styleUrls: ['./product-update.component.scss']
        })
    ], ProductUpdateComponent);
    return ProductUpdateComponent;
}());
exports.ProductUpdateComponent = ProductUpdateComponent;

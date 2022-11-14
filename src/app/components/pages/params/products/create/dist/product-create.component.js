"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductCreateComponent = void 0;
var core_1 = require("@angular/core");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var product_1 = require("src/app/shared/models/product/product");
var ProductCreateComponent = /** @class */ (function () {
    function ProductCreateComponent(router, activeModal, productService, categoryService, measureTypeService, locStorService) {
        this.router = router;
        this.activeModal = activeModal;
        this.productService = productService;
        this.categoryService = categoryService;
        this.measureTypeService = measureTypeService;
        this.locStorService = locStorService;
        //form related objects
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.areMeasureTypeAssociationsValid = false;
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    ProductCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new product_1.Product();
        this.getCategories();
        this.getMeasureTypes();
    };
    ProductCreateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.item = new product_1.Product();
    }; //end ngOnChanges
    //create object
    ProductCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.item.reference = "";
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.productService.createProduct(this.item)
            .then(function (result) {
            _this.show = true;
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = new product_1.Product();
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
    //get list of categories
    ProductCreateComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            _this.categories = categories;
        }, function (error) {
        });
    }; //fin getCategories
    //get list of measuretypes
    ProductCreateComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measuretypes) {
            _this.measureTypes = measuretypes;
        }, function (error) {
        });
    }; //fin getMeasureTypes
    //can save product
    ProductCreateComponent.prototype.canSaveProd = function () {
        var stateProductName = (this.item.name === null || this.item.name === undefined || this.item.name === "");
        var stateProductReference = (this.item.reference !== undefined && this.item.reference !== null && this.item.reference.length < 13);
        var stateProductCategory = (this.item.category === null || this.item.category === undefined);
        var stateMeasureType = (this.item.measure_types === undefined || this.item.measure_types.length === 0);
        var stateMeasureTypeAssociationsValid = (this.item.measure_associations !== undefined && this.item.measure_associations.length !== 0 && this.areMeasureTypeAssociationsValid === false);
        if (stateProductName === true || stateProductCategory === true || stateMeasureType === true
            || stateProductReference === true
            || stateMeasureTypeAssociationsValid === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canAddProd
    //on list change event
    ProductCreateComponent.prototype.onListChanged = function (event) {
        this.item.measure_associations = event;
    }; //fin onListChanged
    //on list validity check event
    ProductCreateComponent.prototype.onListChecked = function (event) {
        this.areMeasureTypeAssociationsValid = event;
    }; //fin onListChecked
    //on measure types list change
    ProductCreateComponent.prototype.onMeasureTypeListChanged = function (event) {
        this.item.measure_types = event;
    };
    //Enregistrement réussie
    ProductCreateComponent.prototype.successSwal = function () {
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
    ProductCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    ProductCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    ProductCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("product_name").focus();
    };
    __decorate([
        core_1.Input()
    ], ProductCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProductCreateComponent.prototype, "created");
    ProductCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-product-create',
            templateUrl: './product-create.component.html',
            styleUrls: ['./product-create.component.scss']
        })
    ], ProductCreateComponent);
    return ProductCreateComponent;
}());
exports.ProductCreateComponent = ProductCreateComponent;

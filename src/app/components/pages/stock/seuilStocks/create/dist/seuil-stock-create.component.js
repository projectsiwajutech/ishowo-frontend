"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SeuilStockCreateComponent = void 0;
var prodstocklimit_1 = require("./../../../../../shared/models/prodstocklimit");
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var SeuilStockCreateComponent = /** @class */ (function () {
    function SeuilStockCreateComponent(productService, categoryService, stockLimitService, locStorService, activeModal, router) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.stockLimitService = stockLimitService;
        this.locStorService = locStorService;
        this.activeModal = activeModal;
        this.router = router;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    SeuilStockCreateComponent.prototype.ngOnInit = function () {
        this.item = new prodstocklimit_1.ProdStockLimit();
        this.user = this.locStorService.getUser();
        this.getProducts();
        this.getCategories();
    };
    //update list of products on cat select
    SeuilStockCreateComponent.prototype.updateProdOnCat = function () {
        var _this = this;
        this.products = this.allProducts.filter(function (x) { return x.category.id === _this.selectedCategory.id; });
        this.updateMeasTypOnProd();
    }; //fin updateMeasTypOnProd
    //update list of measure types on product select
    SeuilStockCreateComponent.prototype.updateMeasTypOnProd = function () {
        var _this = this;
        this.measureTypes = [];
        this.item.product.measure_types.filter(function (x) { return _this.measureTypes.push(x.measure_type); });
        var champ = document.getElementById("mestyp");
        champ.focus();
    }; //fin updateMeasTypOnProd
    //update list of measure types on product select
    SeuilStockCreateComponent.prototype.updateQuantityOnTypeMes = function () {
        var champ = document.getElementById("quant");
        champ.focus();
    }; //fin updateMeasTypOnProd
    //create object
    SeuilStockCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.stockLimitService.createStockLimit(this.item)
            .then(function (result) {
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        });
    };
    //get list of products
    SeuilStockCreateComponent.prototype.getProducts = function () {
        var _this = this;
        this.products = [];
        this.productService.getProducts(this.user)
            .then(function (products) {
            _this.allProducts = products;
            _this.products = products;
        }, function (error) {
        });
    }; //fin getProducts
    //get list of categories
    SeuilStockCreateComponent.prototype.getCategories = function () {
        var _this = this;
        this.categories = [];
        this.categoryService.getCategories(this.user)
            .then(function (categories) {
            _this.categories = categories;
        }, function (error) {
        });
    }; //fin getCategories
    //Enregistrement réussie
    SeuilStockCreateComponent.prototype.successSwal = function () {
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
    SeuilStockCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    SeuilStockCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], SeuilStockCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], SeuilStockCreateComponent.prototype, "created");
    SeuilStockCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-seuil-stock-create',
            templateUrl: './seuil-stock-create.component.html',
            styleUrls: ['./seuil-stock-create.component.scss']
        })
    ], SeuilStockCreateComponent);
    return SeuilStockCreateComponent;
}());
exports.SeuilStockCreateComponent = SeuilStockCreateComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductStockViewComponent = void 0;
var core_1 = require("@angular/core");
var productinstock_1 = require("src/app/shared/models/product/productinstock");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var ProductStockViewComponent = /** @class */ (function () {
    function ProductStockViewComponent(productService, locStorService, activeModal, ngxService, route, router) {
        this.productService = productService;
        this.locStorService = locStorService;
        this.activeModal = activeModal;
        this.ngxService = ngxService;
        this.route = route;
        this.router = router;
        this.hidden = new core_1.EventEmitter(); //used to update the list when action completed here
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.quantity = 0;
    }
    ProductStockViewComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
    };
    //create object
    ProductStockViewComponent.prototype.save = function () {
        var _this = this;
        this.ngxService.start;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.quantity = this.quantity;
        this.productService.expandStockView(this.item, this.user)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.ngxService.stop;
            _this.statusMessage = "Stock modifié avec succès";
            // /this.item = result;
            _this.item = new productinstock_1.ProductInStock();
            _this.quantity = 0;
            _this.hidden.emit("hidden");
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.ngxService.stop;
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //fin save
    //track by
    ProductStockViewComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //can expand stock
    ProductStockViewComponent.prototype.canExpandStock = function () {
        var stateQuantity = (this.quantity === null || this.quantity === undefined || this.quantity.toString() === "" || this.quantity === 0
            || this.quantity > this.item.quantity);
        if (stateQuantity === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canExpandStock
    //Fermeture
    ProductStockViewComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    //Enregistrement réussie
    ProductStockViewComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Stock modifié avec succès!',
            showConfirmButton: false,
            icon: "success",
            timer: 1200,
            timerProgressBar: true
        });
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Echec de l'enregistrement
    ProductStockViewComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement du Transfert', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    __decorate([
        core_1.Input()
    ], ProductStockViewComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], ProductStockViewComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ProductStockViewComponent.prototype, "hidden");
    ProductStockViewComponent = __decorate([
        core_1.Component({
            selector: 'app-product-stock-view',
            templateUrl: './product-stock-view.component.html',
            styleUrls: ['./product-stock-view.component.scss']
        })
    ], ProductStockViewComponent);
    return ProductStockViewComponent;
}());
exports.ProductStockViewComponent = ProductStockViewComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranStocksCreateComponent = void 0;
var core_1 = require("@angular/core");
var stocktransfer_1 = require("src/app/shared/models/stocktransfer/stocktransfer");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var TranStocksCreateComponent = /** @class */ (function () {
    function TranStocksCreateComponent(stockTransferService, productService, compartmentService, libraryService, locStorService, activeModal, router) {
        this.stockTransferService = stockTransferService;
        this.productService = productService;
        this.compartmentService = compartmentService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.activeModal = activeModal;
        this.router = router;
        this.visibility_change = new core_1.EventEmitter();
        this.show = false;
        this.stock_view = [];
        this.current_stock_view = [];
        this.isLoadingStock = false;
        this.visible = false;
        this.page = 1;
        this.pageSize = 30;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    TranStocksCreateComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item = new stocktransfer_1.StockTransfer();
        this.getStockView();
        this.getCompartments();
    };
    TranStocksCreateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.item = new stocktransfer_1.StockTransfer();
        this.isLoadingStock = false;
        this.getStockView();
        this.getCompartments();
    }; //end ngOnChanges
    //create object
    TranStocksCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.product_lines = this.current_stock_view;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.item.product_lines.forEach(function (element) {
            element.compartment = _this.item.destination;
        });
        this.stockTransferService.createTransfer(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.item = new stocktransfer_1.StockTransfer();
            _this.current_stock_view = [];
            _this.item = result;
            _this.created.emit("created");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //fin save
    //check qty to transfer
    TranStocksCreateComponent.prototype.checkQtyTransfer = function (obj) {
        if (obj.quantity_transfer > obj.quantity || obj.quantity_transfer < 0) {
            obj.quantity_transfer = 0;
        }
    }; //fin checkQtyTransfer
    //can save transfer
    TranStocksCreateComponent.prototype.canSaveTransfer = function () {
        var _this = this;
        var stateCompartment = (this.item.source === null || this.item.source === undefined || this.item.destination === null || this.item.destination === undefined || this.item.source.id === this.item.destination.id);
        var stateCurrentStockExist = (this.current_stock_view === null || this.current_stock_view === undefined ||
            this.current_stock_view.length === 0 || (this.current_stock_view.filter(function (x) { return _this.libraryService.isValidNumber(x.quantity_transfer) && x.quantity_transfer !== 0; }).length === 0));
        //let emptyLinesCount : number = this.current_stock_view.filter(x => x.quantity_transfer === 0).length;
        if (stateCompartment === true || stateCurrentStockExist === true) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canSaveTransfer
    //get compartment selected stock
    TranStocksCreateComponent.prototype.getCompStock = function () {
        this.getStockView();
    }; //fin getCompStock
    //get list of compartments
    TranStocksCreateComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            _this.compartments = compartments;
        }, function (error) {
        });
    }; //fin getCompartments
    //get list of products stock view
    TranStocksCreateComponent.prototype.getStockView = function () {
        var _this = this;
        this.stock_view = [];
        this.isLoadingStock = true;
        this.productService.getStockView(this.user)
            .then(function (stock_view) {
            _this.isLoadingStock = false;
            if (stock_view.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.stock_view = stock_view;
            if (_this.item.source !== undefined && _this.item.source !== null) {
                _this.current_stock_view = _this.stock_view.filter(function (x) { return x.compartment.id === _this.item.source.id; });
            }
        }, function (error) {
            _this.isLoadingStock = false;
        });
    }; //fin getStockView
    //Enregistrement réussie
    TranStocksCreateComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Enregistrement du Transfert réussi!',
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
    TranStocksCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement du Transfert', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    TranStocksCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], TranStocksCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], TranStocksCreateComponent.prototype, "visibility_change");
    __decorate([
        core_1.Output()
    ], TranStocksCreateComponent.prototype, "created");
    TranStocksCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-tran-stocks-create',
            templateUrl: './tran-stocks-create.component.html',
            styleUrls: ['./tran-stocks-create.component.scss']
        })
    ], TranStocksCreateComponent);
    return TranStocksCreateComponent;
}());
exports.TranStocksCreateComponent = TranStocksCreateComponent;

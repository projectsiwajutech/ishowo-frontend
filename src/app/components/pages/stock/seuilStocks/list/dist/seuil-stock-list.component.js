"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SeuilStockListComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var measuretype_1 = require("src/app/shared/models/measuretype/measuretype");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var seuil_stock_create_component_1 = require("../create/seuil-stock-create.component");
var seuil_stock_update_component_1 = require("../update/seuil-stock-update.component");
var SeuilStockListComponent = /** @class */ (function () {
    function SeuilStockListComponent(stockLimitService, modalService, measureTypeService, ngxService, locStorService, libraryService, route) {
        this.stockLimitService = stockLimitService;
        this.modalService = modalService;
        this.measureTypeService = measureTypeService;
        this.ngxService = ngxService;
        this.locStorService = locStorService;
        this.libraryService = libraryService;
        this.route = route;
        this.stockLimit = [];
        this.page = 1;
        this.pageSize = 30;
        this.isCreateVisible = false;
        this.isDeleting = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.isLoading = false;
        //filter variables
        this.param = new ProductParam_1.ProductParam();
    }
    SeuilStockListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getStockLimit();
        this.getMeasureTypes();
    };
    //get list of stock limit
    SeuilStockListComponent.prototype.getStockLimit = function () {
        var _this = this;
        this.isLoading = true;
        this.stockLimit = [];
        this.stockLimitService.getStockLimit(this.user)
            .then(function (stockLimit) {
            _this.isLoading = false;
            if (stockLimit.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.stockLimit = stockLimit;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getStockLimit
    //get list of measure types
    SeuilStockListComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measureTypes) {
            var emptyObj = new measuretype_1.MeasureType();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.measureTypes.push(emptyObj);
            measureTypes.filter(function (obj) { return _this.measureTypes.push(obj); });
        }, function (error) {
        });
    }; //fin getMeasureTypes
    //modal d'ajout
    SeuilStockListComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(seuil_stock_create_component_1.SeuilStockCreateComponent, { size: 'xl' });
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis à jour
    SeuilStockListComponent.prototype.updateModal = function (stockLimit) {
        var modalRef = this.modalService.open(seuil_stock_update_component_1.SeuilStockUpdateComponent, { size: 'xl' });
        modalRef.componentInstance.item = stockLimit;
    }; // end updateModal
    //create object
    SeuilStockListComponent.prototype.deleteStoklimit = function (obj) {
        var _this = this;
        this.ngxService.start();
        this.isDeleting = true;
        this.isCompleted = false;
        this.stockLimitService.deleteStockLimit(obj.id)
            .then(function (result) {
            _this.ngxService.stop();
            _this.getStockLimit();
            _this.libraryService.onSuccess("Suppression réussie", 1200, 'top-end');
        }, function (error) {
            _this.ngxService.stop();
            _this.libraryService.onError('Une erreur est survenue au cours de la suppression', 1500, 'top');
            return;
        });
    };
    //confirmInvoiceDeleteModal
    SeuilStockListComponent.prototype.confirmProdRemoveModal = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
                            text: "Confirmez-vous la suppression du seuil de stock du produit: " + item.product.name + " | Type de mesure " + item.produit_measure_type.measure_type.name + " ?",
                            icon: 'warning',
                            imageHeight: 100,
                            imageWidth: 100,
                            showCancelButton: true,
                            cancelButtonText: "Annuler",
                            confirmButtonText: "Oui, Je Confirme",
                            reverseButtons: true,
                            buttonsStyling: true
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                _this.deleteStoklimit(item);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; //fin confirmInvoiceDeleteModal
    SeuilStockListComponent = __decorate([
        core_1.Component({
            selector: 'app-seuil-stock-list',
            templateUrl: './seuil-stock-list.component.html',
            styleUrls: ['./seuil-stock-list.component.scss']
        })
    ], SeuilStockListComponent);
    return SeuilStockListComponent;
}());
exports.SeuilStockListComponent = SeuilStockListComponent;

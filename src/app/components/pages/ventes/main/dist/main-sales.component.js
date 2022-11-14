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
exports.MainSalesComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var sale_details_component_1 = require("../listSale/details/sale-details.component");
var FileSaver = require("file-saver");
var MainSalesComponent = /** @class */ (function () {
    function MainSalesComponent(saleService, locStorService, ngxService, router, modalService, libraryService) {
        this.saleService = saleService;
        this.locStorService = locStorService;
        this.ngxService = ngxService;
        this.router = router;
        this.modalService = modalService;
        this.libraryService = libraryService;
        this.sales = [];
        this.page = 1;
        this.pageSize = 30;
    }
    MainSalesComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getSales();
    };
    MainSalesComponent.prototype.goOne = function () {
        this.router.navigate(['/ventes/createsale']);
    };
    MainSalesComponent.prototype.goTwo = function () {
        this.router.navigate(['/ventes/partialsale']);
    };
    MainSalesComponent.prototype.goThree = function () {
        this.router.navigate(['/ventes/listsales']);
    };
    MainSalesComponent.prototype.goFour = function () {
        this.router.navigate(['/ventes/listdevis']);
    };
    //get list of sales
    MainSalesComponent.prototype.getSales = function () {
        var _this = this;
        this.isLoading = true;
        this.sales = [];
        this.saleService.getSales(this.user)
            .then(function (sales) {
            _this.isLoading = false;
            if (sales.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.sales = sales;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getSales
    //get customer
    MainSalesComponent.prototype.getCustomer = function (obj) {
        var result = "";
        if ((obj !== null) && (obj !== undefined) && (obj.nom !== null) && (obj.prenom !== null)) {
            result = obj.nom + " " + obj.prenom + " (" + obj.telephone + ")";
        }
        else if ((obj !== null) && (obj !== undefined) && (obj.social_reason !== null)) {
            result = obj.social_reason + " (" + obj.telephone + ")";
        }
        else {
            result = "ANONYME";
        }
        return result;
    }; //fin getCustomer
    //get seller
    MainSalesComponent.prototype.getSeller = function (obj) {
        var result = "";
        result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
            (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getSeller
    //select for update
    MainSalesComponent.prototype.viewDetails = function (obj) {
        var modalRef = this.modalService.open(sale_details_component_1.SaleDetailsComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin selectForUpdate
    //select for update
    MainSalesComponent.prototype.CancelSale = function (obj) {
        var _this = this;
        this.ngxService.start();
        this.saleService.cancelSale(obj)
            .then(function (result) {
            _this.ngxService.stop();
            var fileBlob = result.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_FACTURE_AVOIR.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.libraryService.onSuccess("La facture a été Annulée", 2500, 'top-end');
            _this.getSales();
            window.open(url, '_blank');
        }, function (error) {
            _this.ngxService.stop();
            _this.getSales();
            _this.libraryService.onError("Echec de l'annulation", 3000, 'top');
            return;
        });
    }; //fin selectForUpdate
    //confirmInvoiceDeleteModal
    MainSalesComponent.prototype.confirmProdRemoveModal = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert2_js_1["default"].fire({
                            customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
                            text: "\u00CAtes-vous s\u00FBre d'annuler cette vente ?",
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
                                _this.CancelSale(item);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }; //fin confirmInvoiceDeleteModal
    MainSalesComponent = __decorate([
        core_1.Component({
            selector: 'app-main-sales',
            templateUrl: './main-sales.component.html',
            styleUrls: ['./main-sales.component.scss']
        })
    ], MainSalesComponent);
    return MainSalesComponent;
}());
exports.MainSalesComponent = MainSalesComponent;

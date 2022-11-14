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
exports.ListSalesComponent = void 0;
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var FileSaver = require("file-saver");
var sale_details_component_1 = require("../details/sale-details.component");
var ListSalesComponent = /** @class */ (function () {
    function ListSalesComponent(saleService, locStorService, ngxService, modalService, route, router, libraryService, sanitizer) {
        this.saleService = saleService;
        this.locStorService = locStorService;
        this.ngxService = ngxService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.libraryService = libraryService;
        this.sanitizer = sanitizer;
        //form related objects
        this.visible = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        this.sales = [];
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.page = 1;
        this.pageSize = 30;
        this.isCreateVisible = false;
        this.isLoading = false;
        this.isPrinting = false;
        this.isSalesListPdfVisible = false;
        this.generatedSalesListPdf = "";
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    ListSalesComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getSales();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of sales
    ListSalesComponent.prototype.getSales = function () {
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
    //get list of sales
    ListSalesComponent.prototype.searchData = function (form) {
        var _this = this;
        this.param.startDate = form.dateStart;
        this.param.endDate = form.dateEnd;
        this.isLoading = true;
        this.sales = [];
        this.saleService.searchSales(this.param)
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
    }; //fin searchData
    //print list of sales
    ListSalesComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.param.startDate = this.DefaultDateOne;
        this.param.endDate = this.DefaultDateTwo;
        this.saleService.printSales(this.param)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_LISTE_VENTES.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            _this.ngxService.stop();
        }, function (error) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            alert("Une erreur est survenue");
        });
    }; //fin printData
    //update on close
    ListSalesComponent.prototype.updateOnPdfClose = function (event) {
        this.isSalesListPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    ListSalesComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //select for update
    ListSalesComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
        this.visible = false;
        var modalRef = this.modalService.open(sale_details_component_1.SaleDetailsComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin selectForUpdate
    //select for update
    ListSalesComponent.prototype.CancelSale = function (obj) {
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
    //hide detail form
    ListSalesComponent.prototype.updateOnClosed = function ($event) {
        this.visible = true;
    };
    //hide the form
    ListSalesComponent.prototype.hideForm = function () {
        var link = ['/app/sales_main'];
        this.router.navigate(link);
    };
    //get customer
    ListSalesComponent.prototype.getCustomer = function (obj) {
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
    ListSalesComponent.prototype.getSeller = function (obj) {
        var result = "";
        result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
            (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getSeller
    //date de debut
    ListSalesComponent.prototype.getSelectedDateStart = function (event) {
        this.param.startDate = event;
    };
    //date de fin
    ListSalesComponent.prototype.getSelectedDateEnd = function (event) {
        this.param.endDate = event;
    };
    //paginate on page change
    ListSalesComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    //get total sales value
    ListSalesComponent.prototype.getTotalSalesValue = function (items) {
        if (items.length === 0)
            return 0;
        var total = 0;
        total = items
            .map(function (p) { return p.amount_to_pay; })
            .reduce(function (sum, current) { return sum + current; });
        return total;
    }; //fin getTotalSalesValue
    //creer une vente
    ListSalesComponent.prototype.createSale = function () {
        var link = ['/app/sales_create'];
        this.router.navigate(link);
    }; //fin createSale
    //confirmInvoiceDeleteModal
    ListSalesComponent.prototype.confirmProdRemoveModal = function (item) {
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
    __decorate([
        core_1.Input()
    ], ListSalesComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], ListSalesComponent.prototype, "created");
    ListSalesComponent = __decorate([
        core_1.Component({
            selector: 'app-list-sales',
            templateUrl: './list-sales.component.html',
            styleUrls: ['./list-sales.component.scss']
        })
    ], ListSalesComponent);
    return ListSalesComponent;
}());
exports.ListSalesComponent = ListSalesComponent;

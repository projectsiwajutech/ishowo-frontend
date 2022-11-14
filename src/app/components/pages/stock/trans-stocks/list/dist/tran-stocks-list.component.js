"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranStocksListComponent = void 0;
var core_1 = require("@angular/core");
var compartment_1 = require("src/app/shared/models/compartment/compartment");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var ProductParam_1 = require("src/app/shared/models/query/ProductParam");
var tran_stocks_create_component_1 = require("../create/tran-stocks-create.component");
var FileSaver = require("file-saver");
var tran_stocks_details_component_1 = require("../details/tran-stocks-details.component");
var TranStocksListComponent = /** @class */ (function () {
    function TranStocksListComponent(stockTransferService, compartmentService, ngxService, locStorService, modalService, route, libraryService) {
        this.stockTransferService = stockTransferService;
        this.compartmentService = compartmentService;
        this.ngxService = ngxService;
        this.locStorService = locStorService;
        this.modalService = modalService;
        this.route = route;
        this.libraryService = libraryService;
        this.stockTransfers = [];
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.isListVisible = true;
        this.page = 1;
        this.pageSize = 30;
        this.isLoading = false;
        this.isPrinting = false;
        this.isTransfersListPdfVisible = false;
        this.generatedTransfersListPdf = "";
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
        //filter variables
        this.filterParam = new ProductParam_1.ProductParam();
    }
    TranStocksListComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getStockTransferList();
        this.getCompartments();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of stock limit
    TranStocksListComponent.prototype.getStockTransferList = function () {
        var _this = this;
        this.isLoading = true;
        this.stockTransfers = [];
        this.stockTransferService.getTransferList(this.user)
            .then(function (stockTransfers) {
            _this.isLoading = false;
            if (stockTransfers.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.stockTransfers = stockTransfers;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getStockTransferList
    //get list of orders
    TranStocksListComponent.prototype.searchData = function (form) {
        var _this = this;
        this.isLoading = true;
        this.stockTransfers = [];
        this.param.startDate = form.dateStart;
        this.param.endDate = form.dateEnd;
        this.stockTransferService.searchTransfers(this.param)
            .then(function (stockTransfers) {
            _this.isLoading = false;
            if (stockTransfers.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.stockTransfers = stockTransfers;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchData
    //print list of sales
    TranStocksListComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.stockTransferService.printTransfers(this.param)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_LISTE_COMMANDES.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            _this.ngxService.stop();
            window.open(url, '_blank');
        }, function (error) {
            _this.isPrinting = false;
            _this.ngxService.stop();
        });
    }; //fin printData
    //get author
    TranStocksListComponent.prototype.getAuthor = function (obj) {
        var result = "";
        result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getAuthor
    //select for update
    TranStocksListComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
        var modalRef = this.modalService.open(tran_stocks_details_component_1.TranStocksDetailsComponent, { size: 'xl' });
        modalRef.componentInstance.item = obj;
    }; //fin selectForUpdate
    //select for update
    TranStocksListComponent.prototype.selectForUpdate = function (obj) {
        this.selectedUpObject = obj;
    }; //fin selectForUpdate
    TranStocksListComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    TranStocksListComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
    //get list of compartments
    TranStocksListComponent.prototype.getCompartments = function () {
        var _this = this;
        this.compartments = [];
        this.compartmentService.getCompartments(this.user)
            .then(function (compartments) {
            var emptyObj = new compartment_1.Compartment();
            emptyObj.id = 0;
            emptyObj.name = "Tous";
            _this.compartments.push(emptyObj);
            compartments.filter(function (obj) { return _this.compartments.push(obj); });
            //this.compartments = compartments;
        }, function (error) {
        });
    }; //fin getCompartments
    //modal d'ajout
    TranStocksListComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(tran_stocks_create_component_1.TranStocksCreateComponent, { size: 'xl', backdrop: 'static' });
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //paginate on page change
    TranStocksListComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    TranStocksListComponent = __decorate([
        core_1.Component({
            selector: 'app-tran-stocks-list',
            templateUrl: './tran-stocks-list.component.html',
            styleUrls: ['./tran-stocks-list.component.scss']
        })
    ], TranStocksListComponent);
    return TranStocksListComponent;
}());
exports.TranStocksListComponent = TranStocksListComponent;

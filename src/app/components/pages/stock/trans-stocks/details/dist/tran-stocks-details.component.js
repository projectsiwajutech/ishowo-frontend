"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranStocksDetailsComponent = void 0;
var core_1 = require("@angular/core");
var FileSaver = require("file-saver");
var TranStocksDetailsComponent = /** @class */ (function () {
    function TranStocksDetailsComponent(stockTransferService, ngxService, activeModal, locStorService) {
        this.stockTransferService = stockTransferService;
        this.ngxService = ngxService;
        this.activeModal = activeModal;
        this.locStorService = locStorService;
        this.closed = new core_1.EventEmitter(); //used to update the list when action completed here
        this.isPrinting = false;
        this.isTransferPdfVisible = false;
        this.generatedTransferPdf = "";
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
    }
    TranStocksDetailsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item.agent = this.user;
    };
    //track by
    TranStocksDetailsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    TranStocksDetailsComponent.prototype.hideForm = function () {
        this.closed.emit("closed");
    }; //fin hideForm
    //get author
    TranStocksDetailsComponent.prototype.getAuthor = function (obj) {
        var result = "";
        result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getAuthor
    //print order
    TranStocksDetailsComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.stockTransferService.printTransfer(this.item)
            .then(function (pdf) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_TRANSFERT_DETAILS.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            _this.isTransferPdfVisible = true;
            if (pdf != null)
                _this.generatedTransferPdf = pdf.filename;
        }, function (error) {
            _this.ngxService.stop();
            _this.isPrinting = false;
        });
    }; //fin printData
    //update on close
    TranStocksDetailsComponent.prototype.updateOnPdfClose = function (event) {
        this.isTransferPdfVisible = false;
    }; //fin updateOnPdfClose
    TranStocksDetailsComponent.prototype.close = function () {
        this.activeModal.close();
    };
    __decorate([
        core_1.Input()
    ], TranStocksDetailsComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], TranStocksDetailsComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], TranStocksDetailsComponent.prototype, "closed");
    TranStocksDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-tran-stocks-details',
            templateUrl: './tran-stocks-details.component.html',
            styleUrls: ['./tran-stocks-details.component.scss']
        })
    ], TranStocksDetailsComponent);
    return TranStocksDetailsComponent;
}());
exports.TranStocksDetailsComponent = TranStocksDetailsComponent;

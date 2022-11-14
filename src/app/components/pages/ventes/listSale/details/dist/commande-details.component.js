"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VenteDetailsComponent = void 0;
var core_1 = require("@angular/core");
var FileSaver = require("file-saver");
var VenteDetailsComponent = /** @class */ (function () {
    function VenteDetailsComponent(orderService, locStorService, route, activeModal, libraryService, router, sanitizer) {
        this.orderService = orderService;
        this.locStorService = locStorService;
        this.route = route;
        this.activeModal = activeModal;
        this.libraryService = libraryService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.closed = new core_1.EventEmitter(); //used to update the list when action completed here
        this.isPrinting = false;
        this.isOrderPdfVisible = false;
        this.generatedOrderPdf = "";
        this.amountToPay = 0;
        //form related objects
        this.isBalancing = false;
    }
    VenteDetailsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item.agent = this.user;
        this.amountToPay = this.item.amount - this.item.amount_paid;
    };
    //track by
    VenteDetailsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    VenteDetailsComponent.prototype.hideForm = function () {
        this.closed.emit("closed");
    };
    //print order
    VenteDetailsComponent.prototype.printData = function () {
        var _this = this;
        this.isPrinting = true;
        this.orderService.printOrder(this.item)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_DETAIL_COMMANDE.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            // this.isOrderPdfVisible = true;
            // if(pdf != null)  this.generatedOrderPdf = filename; // pdf.filename;
        }, function (error) {
            _this.isPrinting = false;
            alert("Une erreur est survenue");
        });
    }; //fin printData
    //solder
    VenteDetailsComponent.prototype.payBalance = function () {
        var _this = this;
        this.isBalancing = true;
        this.item.amount_paid = parseInt(new String(this.amountToPay).toString()) + parseInt(new String(this.item.amount_paid).toString());
        this.orderService.payBalance(this.item)
            .then(function (result) {
            _this.amountToPay = 0;
            _this.isBalancing = false;
            _this.closed.emit("closed");
        }, function (error) {
            _this.isBalancing = false;
            alert("Une erreur est survenue. Veuillez réessayer");
        });
    }; //fin payBalance
    //can show balance button 
    VenteDetailsComponent.prototype.canShowBalanceBtn = function () {
        if (this.item === null || this.item === undefined) {
            return false;
        }
        if (this.item.amount_paid >= this.item.amount) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canShowBalanceBtn
    //update on close
    VenteDetailsComponent.prototype.updateOnPdfClose = function (event) {
        this.isOrderPdfVisible = false;
    }; //fin updateOnPdfClose
    //Fermeture
    VenteDetailsComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    __decorate([
        core_1.Input()
    ], VenteDetailsComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], VenteDetailsComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], VenteDetailsComponent.prototype, "closed");
    VenteDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-commande-details',
            templateUrl: './commande-details.component.html',
            styleUrls: ['./commande-details.component.scss']
        })
    ], VenteDetailsComponent);
    return VenteDetailsComponent;
}());
exports.VenteDetailsComponent = VenteDetailsComponent;

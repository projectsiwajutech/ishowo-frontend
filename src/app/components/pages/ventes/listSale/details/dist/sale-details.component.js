"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaleDetailsComponent = void 0;
var core_1 = require("@angular/core");
var FileSaver = require("file-saver");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var SaleDetailsComponent = /** @class */ (function () {
    function SaleDetailsComponent(saleService, locStorService, ngxService, libraryService, router, activeModal) {
        this.saleService = saleService;
        this.locStorService = locStorService;
        this.ngxService = ngxService;
        this.libraryService = libraryService;
        this.router = router;
        this.activeModal = activeModal;
        this.closed = new core_1.EventEmitter(); //used to update the list when action completed here
        this.show = false;
        this.isPrinting = false;
        this.isVentePdfVisible = false;
        this.generatedVentePdf = "";
        this.amountToPay = 0;
        //form related objects
        this.isBalancing = false;
    }
    SaleDetailsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item.agent = this.user;
        this.amountToPay = this.item.amount_to_pay - this.item.amount_paid;
    };
    SaleDetailsComponent.prototype.ngOnChanges = function () {
        // if(this.item.customer === null || this.item.customer === undefined){this.item.customer = new User(); }
    };
    //get customer
    SaleDetailsComponent.prototype.getCustomer = function (obj) {
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
    SaleDetailsComponent.prototype.getSeller = function (obj) {
        var result = "";
        result = (obj.user !== null && obj.user !== undefined && obj.user.lastname !== undefined && obj.user.firstname !== undefined) ?
            (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getSeller
    //track by
    SaleDetailsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    SaleDetailsComponent.prototype.hideForm = function () {
        this.closed.emit("closed");
    };
    //print order
    SaleDetailsComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.saleService.printSale(this.item)
            .then(function (pdf) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            var filename = 'ISHOWO_DETAIL_VENTE.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            // this.isVentePdfVisible = true;
            // if(pdf != null)  this.generatedVentePdf = pdf.filename;
        }, function (error) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            alert("Une erreur est survenue");
        });
    }; //fin printData
    //update on close
    SaleDetailsComponent.prototype.updateOnPdfClose = function (event) {
        this.isVentePdfVisible = false;
    }; //fin updateOnPdfClose
    //solder
    SaleDetailsComponent.prototype.payBalance = function () {
        var _this = this;
        this.show = true;
        this.isBalancing = true;
        this.item.amount_paid = parseInt(new String(this.amountToPay).toString()) + parseInt(new String(this.item.amount_paid).toString());
        this.item.rest_to_pay = this.item.amount_to_pay - this.item.amount_paid;
        this.item.remainder = this.item.amount_paid - this.item.amount_to_pay;
        this.saleService.payBalance(this.item)
            .then(function (result) {
            _this.amountToPay = 0;
            _this.isBalancing = false;
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isBalancing = false;
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //fin payBalance
    //can show balance button
    SaleDetailsComponent.prototype.canShowBalanceBtn = function () {
        if (this.item === null || this.item === undefined) {
            return false;
        }
        if (this.item.amount_paid >= this.item.amount_to_pay) {
            return false;
        }
        else {
            return true;
        }
    }; //fin canShowBalanceBtn
    //Fermeture
    SaleDetailsComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    //Enregistrement réussie
    SaleDetailsComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Mis à jour de Vente réussie!',
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
    SaleDetailsComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement de le mise à jour', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    __decorate([
        core_1.Input()
    ], SaleDetailsComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], SaleDetailsComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], SaleDetailsComponent.prototype, "closed");
    SaleDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-sale-details',
            templateUrl: './sale-details.component.html',
            styleUrls: ['./sale-details.component.scss']
        })
    ], SaleDetailsComponent);
    return SaleDetailsComponent;
}());
exports.SaleDetailsComponent = SaleDetailsComponent;

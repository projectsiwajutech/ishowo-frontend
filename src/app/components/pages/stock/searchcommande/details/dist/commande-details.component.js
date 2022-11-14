"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommandeDetailsComponent = void 0;
var core_1 = require("@angular/core");
var FileSaver = require("file-saver");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var CommandeDetailsComponent = /** @class */ (function () {
    function CommandeDetailsComponent(orderService, locStorService, ngxService, activeModal, libraryService, router) {
        this.orderService = orderService;
        this.locStorService = locStorService;
        this.ngxService = ngxService;
        this.activeModal = activeModal;
        this.libraryService = libraryService;
        this.router = router;
        this.closed = new core_1.EventEmitter(); //used to update the list when action completed here
        this.isPrinting = false;
        this.show = false;
        this.isOrderPdfVisible = false;
        this.generatedOrderPdf = "";
        this.amountToPay = 0;
        //form related objects
        this.isBalancing = false;
    }
    CommandeDetailsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.item.agent = this.user;
        this.amountToPay = this.item.amount - this.item.amount_paid;
    };
    //track by
    CommandeDetailsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //hide the form
    CommandeDetailsComponent.prototype.hideForm = function () {
        this.closed.emit("closed");
    };
    //print order
    CommandeDetailsComponent.prototype.printData = function () {
        var _this = this;
        this.ngxService.start();
        this.isPrinting = true;
        this.orderService.printOrder(this.item)
            .then(function (pdf) {
            _this.isPrinting = false;
            var fileBlob = pdf.blob();
            var blob = new Blob([fileBlob], { type: 'application/pdf' });
            _this.ngxService.stop();
            var filename = 'ISHOWO_DETAIL_COMMANDE.pdf';
            FileSaver.saveAs(blob, filename);
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            // this.isOrderPdfVisible = true;
            // if(pdf != null)  this.generatedOrderPdf = filename; // pdf.filename;
        }, function (error) {
            _this.ngxService.stop();
            _this.isPrinting = false;
            alert("Une erreur est survenue");
        });
    }; //fin printData
    //solder
    CommandeDetailsComponent.prototype.payBalance = function () {
        var _this = this;
        this.ngxService.start();
        this.show = true;
        this.isBalancing = true;
        this.item.amount_paid = parseInt(new String(this.amountToPay).toString()) + parseInt(new String(this.item.amount_paid).toString());
        this.orderService.payBalance(this.item)
            .then(function (result) {
            _this.ngxService.stop();
            _this.amountToPay = 0;
            _this.isBalancing = false;
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.ngxService.stop();
            _this.show = false;
            _this.isBalancing = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    }; //fin payBalance
    //can show balance button
    CommandeDetailsComponent.prototype.canShowBalanceBtn = function () {
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
    CommandeDetailsComponent.prototype.updateOnPdfClose = function (event) {
        this.isOrderPdfVisible = false;
    }; //fin updateOnPdfClose
    //Fermeture
    CommandeDetailsComponent.prototype.close = function () {
        this.activeModal.close();
    }; //end close
    //Enregistrement réussie
    CommandeDetailsComponent.prototype.successSwal = function () {
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
    CommandeDetailsComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement de le mise à jour', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    __decorate([
        core_1.Input()
    ], CommandeDetailsComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], CommandeDetailsComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], CommandeDetailsComponent.prototype, "closed");
    CommandeDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-commande-details',
            templateUrl: './commande-details.component.html',
            styleUrls: ['./commande-details.component.scss']
        })
    ], CommandeDetailsComponent);
    return CommandeDetailsComponent;
}());
exports.CommandeDetailsComponent = CommandeDetailsComponent;

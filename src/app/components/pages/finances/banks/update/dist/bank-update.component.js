"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankUpdateComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
require("sweetalert2/src/sweetalert2.scss");
var BankUpdateComponent = /** @class */ (function () {
    function BankUpdateComponent(router, activeModal, bankService, libraryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.bankService = bankService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.show = false;
        this.visible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.banks = [];
        this.updated = new core_1.EventEmitter();
    }
    BankUpdateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    BankUpdateComponent.prototype.ngOnChanges = function () {
        this.user = this.locStorService.getUser();
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    }; //end ngOnChanges
    //create object
    BankUpdateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.item.agent = this.user;
        this.bankService.updateBank(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            _this.item = null;
            ;
            _this.updated.emit("updated");
            _this.show = false;
            _this.activeModal.close();
            _this.successSwal();
        }, function (error) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = false;
            _this.statusMessage = _this.libraryService.getServiceErrorText(error);
            _this.show = false;
            _this.activeModal.close();
            _this.errorSwal();
        });
    };
    //show creation form
    BankUpdateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
    };
    //hide the form
    BankUpdateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.item = null;
    };
    //Enregistrement réussie
    BankUpdateComponent.prototype.successSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire({
            customClass: { container: 'myCustomSwal' },
            title: 'Enregistrement réussi!',
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
    BankUpdateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    BankUpdateComponent.prototype.close = function () {
        this.updated.emit("updated");
        this.activeModal.close();
    }; //end close
    BankUpdateComponent.prototype.onLoadFocus = function () {
        document.getElementById("bank_name").focus();
    };
    __decorate([
        core_1.Input()
    ], BankUpdateComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], BankUpdateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], BankUpdateComponent.prototype, "updated");
    BankUpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-bank-update',
            templateUrl: './bank-update.component.html',
            styleUrls: ['./bank-update.component.scss']
        })
    ], BankUpdateComponent);
    return BankUpdateComponent;
}());
exports.BankUpdateComponent = BankUpdateComponent;

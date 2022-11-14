"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankCreateComponent = void 0;
var core_1 = require("@angular/core");
var bank_1 = require("src/app/shared/models/bank/bank");
require("sweetalert2/src/sweetalert2.scss");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var BankCreateComponent = /** @class */ (function () {
    function BankCreateComponent(router, activeModal, bankService, libraryService, locStorService, route) {
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
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    BankCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new bank_1.Bank();
    };
    BankCreateComponent.prototype.ngOnChanges = function () {
        this.item = new bank_1.Bank();
    }; //end ngOnChanges
    //create object
    BankCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.agent = this.user;
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.bankService.createBank(this.item)
            .then(function (result) {
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.isSuccess = true;
            _this.visible = false;
            // /this.item = result;
            _this.item = new bank_1.Bank();
            _this.created.emit("created");
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
    BankCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    BankCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new bank_1.Bank();
    };
    //Enregistrement réussie
    BankCreateComponent.prototype.successSwal = function () {
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
    BankCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    BankCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    BankCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("name_bank").focus();
    };
    __decorate([
        core_1.Input()
    ], BankCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], BankCreateComponent.prototype, "created");
    BankCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-bank-create',
            templateUrl: './bank-create.component.html',
            styleUrls: ['./bank-create.component.scss']
        })
    ], BankCreateComponent);
    return BankCreateComponent;
}());
exports.BankCreateComponent = BankCreateComponent;

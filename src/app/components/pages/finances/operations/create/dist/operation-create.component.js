"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OperationCreateComponent = void 0;
var core_1 = require("@angular/core");
var finoperation_1 = require("src/app/shared/models/finoperation/finoperation");
var sweetalert2_js_1 = require("sweetalert2/dist/sweetalert2.js");
var typefinoperation_1 = require("src/app/shared/models/typefinoperation/typefinoperation");
var OperationCreateComponent = /** @class */ (function () {
    function OperationCreateComponent(router, activeModal, vAccountService, bankService, profilService, libraryService, locStorService, route) {
        this.router = router;
        this.activeModal = activeModal;
        this.vAccountService = vAccountService;
        this.bankService = bankService;
        this.profilService = profilService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.operation_types = [];
        this.show = false;
        this.visible = false;
        this.isProfileVisible = false;
        this.isBankVisible = false;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
    }
    OperationCreateComponent.prototype.ngOnInit = function () {
        this.onLoadFocus();
        this.user = this.locStorService.getUser();
        this.item = new finoperation_1.FinOperation();
        this.operation_types = this.vAccountService.getOperationTypes();
        this.getAccounts();
    };
    OperationCreateComponent.prototype.ngOnChanges = function () {
        this.item = new finoperation_1.FinOperation();
    }; //end ngOnChanges
    //create object
    OperationCreateComponent.prototype.save = function (form) {
        var _this = this;
        this.show = true;
        this.item.agent = this.user;
        this.item.remaining = undefined;
        if (form.operation_type === "DEPOT") {
            this.item.operation_type = typefinoperation_1.TypeFinOperation.DEPOT;
        }
        else if (form.operation_type === "RETRAIT") {
            this.item.operation_type = typefinoperation_1.TypeFinOperation.RETRAIT;
        }
        this.item.operation_date = new Date();
        this.isSaving = true;
        this.isCompleted = false;
        this.statusMessage = "";
        this.vAccountService.createFinOperation(this.item)
            .then(function (result) {
            if (result === null) {
                _this.isSaving = false;
                _this.isCompleted = true;
                _this.isSuccess = false;
                _this.statusMessage = _this.libraryService.getServiceErrorText("Une erreur est survenue");
                _this.show = false;
                _this.activeModal.close();
                _this.errorSwal();
                return;
            }
            // this.item = result;
            _this.isSaving = false;
            _this.isCompleted = true;
            _this.visible = false;
            _this.isSuccess = true;
            _this.item = new finoperation_1.FinOperation();
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
    }; //fin save
    //show creation form
    OperationCreateComponent.prototype.showCreationForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = true;
    };
    //hide the form
    OperationCreateComponent.prototype.hideForm = function () {
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.visible = false;
        this.item = new finoperation_1.FinOperation();
    };
    //get list of accounts
    OperationCreateComponent.prototype.getAccounts = function () {
        var _this = this;
        this.accounts = [];
        this.vAccountService.getVirtualAccounts(this.user)
            .then(function (accounts) {
            _this.accounts = accounts;
        }, function (error) {
        });
    }; //fin getAccounts
    //Enregistrement réussie
    OperationCreateComponent.prototype.successSwal = function () {
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
    OperationCreateComponent.prototype.errorSwal = function () {
        var _this = this;
        sweetalert2_js_1["default"].fire('Echec de l\'Enregistrement', '', 'error');
        var newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.router.navigate([newRouterLink]);
        });
    };
    //Fermeture
    OperationCreateComponent.prototype.close = function () {
        this.created.emit("created");
        this.activeModal.close();
    }; //end close
    OperationCreateComponent.prototype.onLoadFocus = function () {
        document.getElementById("account_name").focus();
    };
    __decorate([
        core_1.Input()
    ], OperationCreateComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], OperationCreateComponent.prototype, "created");
    OperationCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-operation-create',
            templateUrl: './operation-create.component.html',
            styleUrls: ['./operation-create.component.scss']
        })
    ], OperationCreateComponent);
    return OperationCreateComponent;
}());
exports.OperationCreateComponent = OperationCreateComponent;

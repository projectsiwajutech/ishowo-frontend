"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OperationsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var operation_create_component_1 = require("../create/operation-create.component");
var OperationsComponent = /** @class */ (function () {
    function OperationsComponent(modalService, vAccountService, libraryService, locStorService, route) {
        this.modalService = modalService;
        this.vAccountService = vAccountService;
        this.libraryService = libraryService;
        this.locStorService = locStorService;
        this.route = route;
        this.page = 1;
        this.pageSize = 30;
        this.DefaultDateOne = new Date();
        this.DefaultDateTwo = new Date();
        this.operations = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    OperationsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getFinOperations();
    };
    //get list of finoperations
    OperationsComponent.prototype.getFinOperations = function () {
        var _this = this;
        this.isLoading = true;
        this.operations = [];
        this.vAccountService.getFinOperations(this.user)
            .then(function (operations) {
            _this.isLoading = false;
            if (operations.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.operations = operations;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getFinOperations
    //get list of sales
    OperationsComponent.prototype.searchData = function (form) {
        var _this = this;
        this.param.startDate = new Date(form.dateStart);
        this.param.startDate.setHours(0, 0, 0);
        this.param.endDate = new Date(form.dateEnd);
        this.param.endDate.setHours(23, 59, 59);
        this.isLoading = true;
        this.operations = [];
        this.vAccountService.searchFinOperations(this.param)
            .then(function (operations) {
            _this.isLoading = false;
            if (operations.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.operations = operations;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchData
    //track by
    OperationsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //modal d'ajout
    OperationsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(operation_create_component_1.OperationCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    OperationsComponent = __decorate([
        core_1.Component({
            selector: 'app-operations',
            templateUrl: './operations.component.html',
            styleUrls: ['./operations.component.scss']
        })
    ], OperationsComponent);
    return OperationsComponent;
}());
exports.OperationsComponent = OperationsComponent;

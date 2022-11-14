"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var LogsComponent = /** @class */ (function () {
    function LogsComponent(constantService, userService, locStorService, route, router, libraryService) {
        this.constantService = constantService;
        this.userService = userService;
        this.locStorService = locStorService;
        this.route = route;
        this.router = router;
        this.libraryService = libraryService;
        //form related objects
        this.page = 1;
        this.pageSize = 30;
        this.visible = true;
        this.isSaving = false;
        this.isCompleted = false;
        this.isSuccess = false;
        this.statusMessage = "";
        this.created = new core_1.EventEmitter(); //used to update the list when creation completed here
        this.items = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.isPrinting = false;
        this.isOrdersListPdfVisible = false;
        this.generatedOrdersListPdf = "";
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
    }
    LogsComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getItems();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
        this.dtOptions = this.constantService.DtOptions;
    };
    LogsComponent.prototype.ngOnChanges = function () {
    };
    //get list of items
    LogsComponent.prototype.getItems = function () {
        var _this = this;
        this.isLoading = true;
        this.items = [];
        this.userService.getLogs(this.user)
            .then(function (items) {
            _this.isLoading = false;
            if (items.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.items = items;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getItems
    //get list of orders
    LogsComponent.prototype.searchData = function () {
        var _this = this;
        this.isLoading = true;
        this.items = [];
        this.userService.searchLogs(this.param)
            .then(function (items) {
            _this.isLoading = false;
            _this.items = items;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchData
    //print list of sales
    LogsComponent.prototype.printData = function () {
        var _this = this;
        this.isPrinting = true;
        this.userService.searchLogs(this.param)
            .then(function (pdf) {
            _this.isPrinting = false;
            _this.isOrdersListPdfVisible = true;
            if (pdf != null) {
                _this.generatedOrdersListPdf = pdf.filename;
            }
        }, function (error) {
            _this.isPrinting = false;
        });
    }; //fin printData
    //update on close
    LogsComponent.prototype.updateOnPdfClose = function (event) {
        this.isOrdersListPdfVisible = event;
    }; //fin updateOnPdfClose
    //track by
    LogsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //select for update
    LogsComponent.prototype.viewDetails = function (obj) {
        this.selectedUpObject = obj;
        this.visible = false;
    }; //fin selectForUpdate
    //hide detail form
    LogsComponent.prototype.updateOnClosed = function ($event) {
        this.visible = true;
    };
    //get orderer
    LogsComponent.prototype.getOrderer = function (obj) {
        var result = "";
        result = (obj.user !== null) ? (obj.user.lastname + " " + obj.user.firstname) : "";
        return result;
    }; //fin getOrderer
    LogsComponent.prototype.getSelectedDate1 = function ($event) {
        this.param.startDate = $event;
    };
    LogsComponent.prototype.getSelectedDate2 = function ($event) {
        this.param.endDate = $event;
    };
    //paginate on page change
    LogsComponent.prototype.paginate = function (event) {
        this.pageStartIndex = event.first;
        this.pageLimit = event.rows;
    }; //fin
    __decorate([
        core_1.Input()
    ], LogsComponent.prototype, "subject");
    __decorate([
        core_1.Output()
    ], LogsComponent.prototype, "created");
    LogsComponent = __decorate([
        core_1.Component({
            selector: 'app-agencies',
            templateUrl: './logs.component.html',
            styleUrls: ['./logs.component.scss']
        })
    ], LogsComponent);
    return LogsComponent;
}());
exports.LogsComponent = LogsComponent;

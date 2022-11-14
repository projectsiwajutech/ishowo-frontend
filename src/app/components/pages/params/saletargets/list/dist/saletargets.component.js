"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SaletargetsComponent = void 0;
var core_1 = require("@angular/core");
var PeriodParam_1 = require("src/app/shared/models/query/PeriodParam");
var saletarget_create_component_1 = require("../create/saletarget-create.component");
var saletarget_delete_component_1 = require("../delete/saletarget-delete.component");
var saletarget_update_component_1 = require("../update/saletarget-update.component");
var SaletargetsComponent = /** @class */ (function () {
    function SaletargetsComponent(modalService, constantService, saletargetService, locStorService, route, libraryService) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.saletargetService = saletargetService;
        this.locStorService = locStorService;
        this.route = route;
        this.libraryService = libraryService;
        this.saleTargetList = [];
        this.param = new PeriodParam_1.PeriodParam();
        this.pageStartIndex = 0;
        this.limitTable = [];
        this.pageLimit = 0;
        this.page = 1;
        this.pageSize = 30;
        this.isCreateVisible = false;
        this.isLoading = false;
    }
    SaletargetsComponent.prototype.ngOnInit = function () {
        this.dtOptions = this.constantService.DtOptions;
        this.user = this.locStorService.getUser();
        this.param.agent = this.user;
        this.getSaleTargetList();
        this.limitTable = this.libraryService.getPaginatorLimitList();
        this.pageLimit = this.libraryService.getPaginatorDefaultLimit();
    };
    //get list of saletarget list
    SaletargetsComponent.prototype.getSaleTargetList = function () {
        var _this = this;
        this.isLoading = true;
        this.saleTargetList = [];
        this.saletargetService.getSaleTargetList(this.user)
            .then(function (saletargetlist) {
            _this.isLoading = false;
            if (saletargetlist.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.saleTargetList = saletargetlist;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getSaleTargetList
    //search saletarget list
    SaletargetsComponent.prototype.searchData = function () {
        var _this = this;
        this.isLoading = true;
        this.saleTargetList = [];
        this.saletargetService.searchSaleTarget(this.param)
            .then(function (saletargetlist) {
            _this.isLoading = false;
            if (saletargetlist.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.saleTargetList = saletargetlist;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin searchSaleTargetList
    //track by
    SaletargetsComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    //start date
    SaletargetsComponent.prototype.getSelectedDateStart = function (event) {
        this.param.startDate = event;
    }; //fin getSelectedDateStart
    //end date
    SaletargetsComponent.prototype.getSelectedDateEnd = function (event) {
        this.param.endDate = event;
    }; //fin getSelectedDateEnd
    //modal d'ajout
    SaletargetsComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(saletarget_create_component_1.SaletargetCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    SaletargetsComponent.prototype.updateModal = function (saletarget) {
        var modalRef = this.modalService.open(saletarget_update_component_1.SaletargetUpdateComponent);
        modalRef.componentInstance.item = saletarget;
    }; //fin updateModal
    //modal de suppression
    SaletargetsComponent.prototype.deleteModal = function (saletarget) {
        var modalRef = this.modalService.open(saletarget_delete_component_1.SaletargetDeleteComponent);
        modalRef.componentInstance.item = saletarget;
    }; //fin suppression
    SaletargetsComponent = __decorate([
        core_1.Component({
            selector: 'app-saletargets',
            templateUrl: './saletargets.component.html',
            styleUrls: ['./saletargets.component.scss']
        })
    ], SaletargetsComponent);
    return SaletargetsComponent;
}());
exports.SaletargetsComponent = SaletargetsComponent;

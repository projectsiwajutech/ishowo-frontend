"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MeasuretypesComponent = void 0;
var core_1 = require("@angular/core");
var measuretype_create_component_1 = require("../create/measuretype-create.component");
var measuretype_delete_component_1 = require("../delete/measuretype-delete.component");
var measuretype_update_component_1 = require("../update/measuretype-update.component");
var MeasuretypesComponent = /** @class */ (function () {
    function MeasuretypesComponent(modalService, constantService, measureTypeService, locStorService, route) {
        this.modalService = modalService;
        this.constantService = constantService;
        this.measureTypeService = measureTypeService;
        this.locStorService = locStorService;
        this.route = route;
        this.measureTypes = [];
        this.isCreateVisible = false;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 30;
    }
    MeasuretypesComponent.prototype.ngOnInit = function () {
        this.user = this.locStorService.getUser();
        this.getMeasureTypes();
        this.dtOptions = this.constantService.DtOptions;
    };
    //get list of agencies
    MeasuretypesComponent.prototype.getMeasureTypes = function () {
        var _this = this;
        this.isLoading = true;
        this.measureTypes = [];
        this.measureTypeService.getMeasureTypes(this.user)
            .then(function (measureTypes) {
            _this.isLoading = false;
            if (measureTypes.length === 0) {
                _this.noData = true;
            }
            else {
                _this.noData = false;
            }
            _this.measureTypes = measureTypes;
        }, function (error) {
            _this.isLoading = false;
        });
    }; //fin getMeasureTypes
    //track by
    MeasuretypesComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    }; //fin trackByFn
    MeasuretypesComponent.prototype.createModal = function () {
        var modalRef = this.modalService.open(measuretype_create_component_1.MeasuretypeCreateComponent);
        modalRef.componentInstance.created.subscribe(function (receivedEntry) {
        });
    }; // end createModal
    //modal de mis-à-jour
    MeasuretypesComponent.prototype.updateModal = function (measuretype) {
        var modalRef = this.modalService.open(measuretype_update_component_1.MeasuretypeUpdateComponent);
        modalRef.componentInstance.item = measuretype;
    }; //fin updateModal
    //modal de suppression
    MeasuretypesComponent.prototype.deleteModal = function (measuretype) {
        var modalRef = this.modalService.open(measuretype_delete_component_1.MeasuretypeDeleteComponent);
        modalRef.componentInstance.item = measuretype;
    }; //fin de suppression
    MeasuretypesComponent = __decorate([
        core_1.Component({
            selector: 'app-agencies',
            templateUrl: './measuretypes.component.html',
            styleUrls: ['./measuretypes.component.scss']
        })
    ], MeasuretypesComponent);
    return MeasuretypesComponent;
}());
exports.MeasuretypesComponent = MeasuretypesComponent;

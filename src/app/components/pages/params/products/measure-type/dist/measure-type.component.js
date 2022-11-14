"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MeasureTypeComponent = void 0;
var core_1 = require("@angular/core");
var prodmeasuretype_1 = require("src/app/shared/models/prodmeasuretype/prodmeasuretype");
var MeasureTypeComponent = /** @class */ (function () {
    function MeasureTypeComponent(productService) {
        this.productService = productService;
        this.list_changed = new core_1.EventEmitter();
        this.isRemoving = false;
    }
    MeasureTypeComponent.prototype.ngOnInit = function () {
    };
    MeasureTypeComponent.prototype.ngOnChanges = function () {
        if (this.addedMeasureTypes === undefined || this.addedMeasureTypes === null) {
            this.addedMeasureTypes = [];
        }
    };
    //add type mesure
    MeasureTypeComponent.prototype.addMesureType = function () {
        var _this = this;
        if (this.selectedMeasureType === undefined || this.selectedMeasureType === null || this.selectedMeasureType.id === undefined)
            return;
        if (this.addedMeasureTypes === undefined || this.addedMeasureTypes === null) {
            this.addedMeasureTypes = [];
        }
        //no double in measure types
        var search = this.addedMeasureTypes.filter(function (mt) { return mt.measure_type.id === _this.selectedMeasureType.id; });
        if (search.length !== 0)
            return;
        var pmt = new prodmeasuretype_1.ProdMeasureType();
        pmt.measure_type = this.selectedMeasureType;
        this.addedMeasureTypes.push(pmt);
        this.list_changed.emit(this.addedMeasureTypes);
        //clean
        this.selectedMeasureType = undefined;
    }; //fin addTypeMesure
    //remove measure type
    MeasureTypeComponent.prototype.removeMeasureType = function (index, measureTypeLine) {
        var _this = this;
        this.isRemoving = true;
        this.productService.deleteProdMeasureType(measureTypeLine)
            .then(function (result) {
            _this.isRemoving = false;
            _this.addedMeasureTypes.splice(index, 1);
            _this.list_changed.emit(_this.addedMeasureTypes);
        }, function (error) {
            _this.isRemoving = false;
        });
    }; //fin removeMeasureType
    __decorate([
        core_1.Input()
    ], MeasureTypeComponent.prototype, "measureTypes");
    __decorate([
        core_1.Input()
    ], MeasureTypeComponent.prototype, "addedMeasureTypes");
    __decorate([
        core_1.Output()
    ], MeasureTypeComponent.prototype, "list_changed");
    __decorate([
        core_1.Input()
    ], MeasureTypeComponent.prototype, "subject");
    MeasureTypeComponent = __decorate([
        core_1.Component({
            selector: 'app-measure-type',
            templateUrl: './measure-type.component.html',
            styleUrls: ['./measure-type.component.scss']
        })
    ], MeasureTypeComponent);
    return MeasureTypeComponent;
}());
exports.MeasureTypeComponent = MeasureTypeComponent;

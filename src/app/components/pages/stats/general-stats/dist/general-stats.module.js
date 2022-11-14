"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GeneralStatsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_datatables_1 = require("angular-datatables");
var general_stats_component_1 = require("./general-stats.component");
var general_stats_routing_module_1 = require("./general-stats-routing.module");
var shared_module_1 = require("src/app/theme/shared/shared.module");
var GeneralStatsModule = /** @class */ (function () {
    function GeneralStatsModule() {
    }
    GeneralStatsModule = __decorate([
        core_1.NgModule({
            declarations: [general_stats_component_1.GeneralStatsComponent],
            imports: [
                common_1.CommonModule,
                general_stats_routing_module_1.GeneralStatsRoutingModule,
                shared_module_1.SharedModule,
                angular_datatables_1.DataTablesModule
            ]
        })
    ], GeneralStatsModule);
    return GeneralStatsModule;
}());
exports.GeneralStatsModule = GeneralStatsModule;

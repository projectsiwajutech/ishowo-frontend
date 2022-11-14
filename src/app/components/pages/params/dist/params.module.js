"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParamsModule = void 0;
var shared_module_1 = require("./../../../theme/shared/shared.module");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var params_routing_module_1 = require("./params-routing.module");
var agency_create_component_1 = require("./agencies/create/agency-create.component");
var agency_update_component_1 = require("./agencies/update/agency-update.component");
var compartment_delete_component_1 = require("./compartments/delete/compartment-delete.component");
var category_create_component_1 = require("./categories/create/category-create.component");
var category_delete_component_1 = require("./categories/delete/category-delete.component");
var category_update_component_1 = require("./categories/update/category-update.component");
var supplier_create_component_1 = require("./suppliers/create/supplier-create.component");
var measuretype_delete_component_1 = require("./measuretypes/delete/measuretype-delete.component");
var measuretype_update_component_1 = require("./measuretypes/update/measuretype-update.component");
var supplier_delete_component_1 = require("./suppliers/delete/supplier-delete.component");
var measuretype_create_component_1 = require("./measuretypes/create/measuretype-create.component");
var product_delete_component_1 = require("./products/delete/product-delete.component");
var supplier_update_component_1 = require("./suppliers/update/supplier-update.component");
var saletarget_update_component_1 = require("./saletargets/update/saletarget-update.component");
var saletarget_delete_component_1 = require("./saletargets/delete/saletarget-delete.component");
var saletarget_create_component_1 = require("./saletargets/create/saletarget-create.component");
var product_update_component_1 = require("./products/update/product-update.component");
var product_create_component_1 = require("./products/create/product-create.component");
var compartment_update_component_1 = require("./compartments/update/compartment-update.component");
var compartment_create_component_1 = require("./compartments/create/compartment-create.component");
var agency_delete_component_1 = require("./agencies/delete/agency-delete.component");
var contenance_list_component_1 = require("./products/contenance-list/contenance-list.component");
var contenance_component_1 = require("./products/contenance/contenance.component");
var measure_type_component_1 = require("./products/measure-type/measure-type.component");
var customer_update_component_1 = require("./customers/update/customer-update.component");
var customer_delete_component_1 = require("./customers/delete/customer-delete.component");
var customer_create_component_1 = require("./customers/create/customer-create.component");
var ParamsModule = /** @class */ (function () {
    function ParamsModule() {
    }
    ParamsModule = __decorate([
        core_1.NgModule({
            declarations: [agency_create_component_1.AgencyCreateComponent, agency_update_component_1.AgencyUpdateComponent,
                compartment_delete_component_1.CompartmentDeleteComponent, category_create_component_1.CategoryCreateComponent, customer_update_component_1.CustomerUpdateComponent,
                category_delete_component_1.CategoryDeleteComponent, category_update_component_1.CategoryUpdateComponent, customer_delete_component_1.CustomerDeleteComponent,
                supplier_create_component_1.SupplierCreateComponent, compartment_update_component_1.CompartmentUpdateComponent, compartment_create_component_1.CompartmentCreateComponent,
                supplier_update_component_1.SupplierUpdateComponent, supplier_delete_component_1.SupplierDeleteComponent, customer_create_component_1.CustomerCreateComponent,
                measuretype_create_component_1.MeasuretypeCreateComponent, measuretype_update_component_1.MeasuretypeUpdateComponent, measuretype_delete_component_1.MeasuretypeDeleteComponent,
                product_create_component_1.ProductCreateComponent, product_update_component_1.ProductUpdateComponent,
                product_delete_component_1.ProductDeleteComponent, saletarget_create_component_1.SaletargetCreateComponent,
                saletarget_update_component_1.SaletargetUpdateComponent, saletarget_delete_component_1.SaletargetDeleteComponent, agency_delete_component_1.AgencyDeleteComponent,
                contenance_list_component_1.ContenanceListComponent, contenance_component_1.ContenanceComponent, measure_type_component_1.MeasureTypeComponent],
            imports: [
                common_1.CommonModule,
                params_routing_module_1.EcommerceRoutingModule,
                shared_module_1.SharedModule
            ]
        })
    ], ParamsModule);
    return ParamsModule;
}());
exports.ParamsModule = ParamsModule;

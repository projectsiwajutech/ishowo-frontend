import { SharedModule } from './../../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './params-routing.module';
import { AgencyCreateComponent } from './agencies/create/agency-create.component';
import { AgencyUpdateComponent } from './agencies/update/agency-update.component';
import { CompartmentDeleteComponent } from './compartments/delete/compartment-delete.component';
import { CategoryCreateComponent } from './categories/create/category-create.component';
import { CategoryDeleteComponent } from './categories/delete/category-delete.component';
import { CategoryUpdateComponent } from './categories/update/category-update.component';
import { SupplierCreateComponent } from './suppliers/create/supplier-create.component';
import { MeasuretypeDeleteComponent } from './measuretypes/delete/measuretype-delete.component';
import { MeasuretypeUpdateComponent } from './measuretypes/update/measuretype-update.component';
import { SupplierDeleteComponent } from './suppliers/delete/supplier-delete.component';
import { MeasuretypeCreateComponent } from './measuretypes/create/measuretype-create.component';
import { ProductDeleteComponent } from './products/delete/product-delete.component';
import { SupplierUpdateComponent } from './suppliers/update/supplier-update.component';
import { SaletargetUpdateComponent } from './saletargets/update/saletarget-update.component';
import { SaletargetDeleteComponent } from './saletargets/delete/saletarget-delete.component';
import { SaletargetCreateComponent } from './saletargets/create/saletarget-create.component';
import { ProductUpdateComponent } from './products/update/product-update.component';
import { ProductCreateComponent } from './products/create/product-create.component';
import { CompartmentUpdateComponent } from './compartments/update/compartment-update.component';
import { CompartmentCreateComponent } from './compartments/create/compartment-create.component';
import { AgencyDeleteComponent } from './agencies/delete/agency-delete.component';
import { ContenanceListComponent } from './products/contenance-list/contenance-list.component';
import { ContenanceComponent } from './products/contenance/contenance.component';
import { MeasureTypeComponent } from './products/measure-type/measure-type.component';
import { CustomerUpdateComponent } from './customers/update/customer-update.component';
import { CustomerDeleteComponent } from './customers/delete/customer-delete.component';
import { CustomerCreateComponent } from './customers/create/customer-create.component';

@NgModule({
  declarations: [AgencyCreateComponent, AgencyUpdateComponent,
    CompartmentDeleteComponent, CategoryCreateComponent, CustomerUpdateComponent,
    CategoryDeleteComponent, CategoryUpdateComponent, CustomerDeleteComponent,
     SupplierCreateComponent,CompartmentUpdateComponent,CompartmentCreateComponent,
    SupplierUpdateComponent, SupplierDeleteComponent, CustomerCreateComponent,
    MeasuretypeCreateComponent, MeasuretypeUpdateComponent, MeasuretypeDeleteComponent,
   ProductCreateComponent, ProductUpdateComponent,
    ProductDeleteComponent,  SaletargetCreateComponent,
    SaletargetUpdateComponent, SaletargetDeleteComponent, AgencyDeleteComponent,
     ContenanceListComponent, ContenanceComponent, MeasureTypeComponent],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule
  ]
})
export class ParamsModule { }

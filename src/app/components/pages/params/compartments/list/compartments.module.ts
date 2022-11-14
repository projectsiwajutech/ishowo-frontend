import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommProductRoutingModule } from './compartments-routing.module';
import { CompartmentsComponent } from './compartments.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [CompartmentsComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './agencies-routing.module';
import { AgenciesComponent } from './agencies.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [AgenciesComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }

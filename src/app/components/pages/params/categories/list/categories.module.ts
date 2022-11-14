import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommProductRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    EcommProductRoutingModule,
    SharedModule,
  ]
})
export class ParamsModule { }

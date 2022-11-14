import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule,
  ]
})
export class StatsModule { }



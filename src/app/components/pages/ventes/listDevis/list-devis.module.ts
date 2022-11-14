import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListDevisComponent } from './list-devis.component';
import { ListDevisRoutingModule } from './list-devis-routing.module';


@NgModule({
  declarations: [ListDevisComponent],
  imports: [
    CommonModule,
    ListDevisRoutingModule,
    SharedModule,
  ],
  providers: []

})
export class ListDevisModule { }

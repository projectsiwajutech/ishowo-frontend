import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeDetailsComponent } from './commande-details.component';
import { CommandeDetailsRoutingModule } from './commande-details-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [CommandeDetailsComponent],
  imports: [
    CommonModule,
    CommandeDetailsRoutingModule,
    SharedModule,
  ]
})
export class CommandeDetailsModule { }

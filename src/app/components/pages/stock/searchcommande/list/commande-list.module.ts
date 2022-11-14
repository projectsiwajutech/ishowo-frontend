import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeListComponent } from './commande-list.component';
import { CommandesListRoutingModule } from './commande-list-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CommandeListComponent],
  imports: [
    CommonModule,
    CommandesListRoutingModule,
    SharedModule,
  ],
  providers: []

})
export class CommandesListModule { }

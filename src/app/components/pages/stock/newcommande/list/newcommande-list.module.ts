import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCommandeRoutingModule } from './newcommande-routing.module';
import { NewcommandeListComponent } from './newcommande-list.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';
import { SavedOrdersListComponent } from './saved-orders-list/saved-orders-list.component';

@NgModule({
  declarations: [NewcommandeListComponent, SavedOrdersListComponent],
  imports: [
    CommonModule,
    NewCommandeRoutingModule,
    SharedModule,
  ]
})
export class NewCommandeListModule { }

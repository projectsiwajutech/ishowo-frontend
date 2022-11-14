import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeCreateRoutingModule } from './commande-routing.module';
import { CommandeCreateComponent } from './commande-create.component';
import {SharedModule} from '../../../../../theme/shared/shared.module';


@NgModule({
  declarations: [CommandeCreateComponent],
  imports: [
    CommonModule,
    CommandeCreateRoutingModule,
    SharedModule,
    SnotifyModule
  ],
  providers: []

})
export class CommandeCreateModule { }

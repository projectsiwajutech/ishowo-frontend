import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PartialSaleRoutingModule} from './partial-sale-create-routing.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { PartialSaleCreateComponent } from './partial-sale-create.component';


@NgModule({
  declarations: [PartialSaleCreateComponent],
  imports: [
    CommonModule,
    PartialSaleRoutingModule,
    SharedModule,
    SnotifyModule
  ],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]

})
export class PartialSaleModule { }

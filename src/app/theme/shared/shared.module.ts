import { ProdMeasureTypePipe } from 'src/app/shared/pipes/domain_specific/prod_measure_type.pipe';
import { FormatMoneyPipe } from 'src/app/shared/pipes/format_money/format_money.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BreadcrumbModule, CardModule, ModalModule } from './components';
import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { TodoListRemoveDirective } from './components/todo/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './components/todo/todo-card-complete.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApexChartComponent } from './components/chart/apex-chart/apex-chart.component';
import {ApexChartService} from './components/chart/apex-chart/apex-chart.service';
import { ToastComponent } from './components/toast/toast.component';
import {ToastService} from './components/toast/toast.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import {LightboxModule} from 'ngx-lightbox';
import { StockViewPipe } from 'src/app/shared/pipes/domain_specific/stock_view.pipe';
import { ProductByNameAndCodePipe } from 'src/app/shared/pipes/domain_specific/productByNameAndCode.pipe';
import { CustomerByNamePipe } from 'src/app/shared/pipes/domain_specific/customerByName.pipe';
import { CompleteProdNamePipe } from 'src/app/shared/pipes/domain_specific/completeProdName.pipe';
import { NgxUiLoaderModule,  NgxUiLoaderConfig} from 'ngx-ui-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { registerLocaleData } from '@angular/common';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { StockLimitPipe } from 'src/app/shared/pipes/domain_specific/stock_limit.pipe';
import { StockTransferPipe } from 'src/app/shared/pipes/domain_specific/stock_transfer.pipe';
registerLocaleData(localeFr, 'fr');

/*import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';*/

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "three-strings",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 3000
}

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    ClickOutsideModule,
    LightboxModule,
    NgbModule,
    DataTablesModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    NgbModule,
    BreadcrumbModule,
    ModalModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickOutsideModule,
    SpinnerComponent,
    ApexChartComponent,
    GalleryComponent,
    ToastComponent,
    FormatMoneyPipe,
    StockViewPipe,
    ProductByNameAndCodePipe,
    CustomerByNamePipe,
    CompleteProdNamePipe,
    StockTransferPipe,
    StockLimitPipe,
    ProdMeasureTypePipe,
    NgxUiLoaderModule,
    DataTablesModule
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent,
    ApexChartComponent,
    ToastComponent,
    GalleryComponent,
    FormatMoneyPipe,
    StockViewPipe,
    StockLimitPipe,
    StockTransferPipe,
    ProductByNameAndCodePipe,
    CustomerByNamePipe,
    CompleteProdNamePipe,
    ProdMeasureTypePipe,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ApexChartService,
    ToastService,
  ]
})
export class SharedModule { }



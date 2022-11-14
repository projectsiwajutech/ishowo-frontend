"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var prod_measure_type_pipe_1 = require("src/app/shared/pipes/domain_specific/prod_measure_type.pipe");
var format_money_pipe_1 = require("src/app/shared/pipes/format_money/format_money.pipe");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var components_1 = require("./components");
var data_filter_pipe_1 = require("./components/data-table/data-filter.pipe");
var todo_list_remove_directive_1 = require("./components/todo/todo-list-remove.directive");
var todo_card_complete_directive_1 = require("./components/todo/todo-card-complete.directive");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ng_click_outside_1 = require("ng-click-outside");
var spinner_component_1 = require("./components/spinner/spinner.component");
var apex_chart_component_1 = require("./components/chart/apex-chart/apex-chart.component");
var apex_chart_service_1 = require("./components/chart/apex-chart/apex-chart.service");
var toast_component_1 = require("./components/toast/toast.component");
var toast_service_1 = require("./components/toast/toast.service");
var gallery_component_1 = require("./components/gallery/gallery.component");
var ngx_lightbox_1 = require("ngx-lightbox");
var stock_view_pipe_1 = require("src/app/shared/pipes/domain_specific/stock_view.pipe");
var productByNameAndCode_pipe_1 = require("src/app/shared/pipes/domain_specific/productByNameAndCode.pipe");
var customerByName_pipe_1 = require("src/app/shared/pipes/domain_specific/customerByName.pipe");
var completeProdName_pipe_1 = require("src/app/shared/pipes/domain_specific/completeProdName.pipe");
var ngx_ui_loader_1 = require("ngx-ui-loader");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_datatables_1 = require("angular-datatables");
var common_2 = require("@angular/common");
var common_3 = require("@angular/common");
var fr_1 = require("@angular/common/locales/fr");
var stock_limit_pipe_1 = require("src/app/shared/pipes/domain_specific/stock_limit.pipe");
var stock_transfer_pipe_1 = require("src/app/shared/pipes/domain_specific/stock_transfer.pipe");
common_2.registerLocaleData(fr_1["default"], 'fr');
/*import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';*/
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var ngxUiLoaderConfig = {
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
};
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                components_1.AlertModule,
                components_1.CardModule,
                components_1.BreadcrumbModule,
                components_1.ModalModule,
                ng_click_outside_1.ClickOutsideModule,
                ngx_lightbox_1.LightboxModule,
                ng_bootstrap_1.NgbModule,
                angular_datatables_1.DataTablesModule
            ],
            exports: [
                common_1.CommonModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                components_1.AlertModule,
                components_1.CardModule,
                ng_bootstrap_1.NgbModule,
                components_1.BreadcrumbModule,
                components_1.ModalModule,
                data_filter_pipe_1.DataFilterPipe,
                todo_list_remove_directive_1.TodoListRemoveDirective,
                todo_card_complete_directive_1.TodoCardCompleteDirective,
                ng_click_outside_1.ClickOutsideModule,
                spinner_component_1.SpinnerComponent,
                apex_chart_component_1.ApexChartComponent,
                gallery_component_1.GalleryComponent,
                toast_component_1.ToastComponent,
                format_money_pipe_1.FormatMoneyPipe,
                stock_view_pipe_1.StockViewPipe,
                productByNameAndCode_pipe_1.ProductByNameAndCodePipe,
                customerByName_pipe_1.CustomerByNamePipe,
                completeProdName_pipe_1.CompleteProdNamePipe,
                stock_transfer_pipe_1.StockTransferPipe,
                stock_limit_pipe_1.StockLimitPipe,
                prod_measure_type_pipe_1.ProdMeasureTypePipe,
                ngx_ui_loader_1.NgxUiLoaderModule,
                angular_datatables_1.DataTablesModule
            ],
            declarations: [
                data_filter_pipe_1.DataFilterPipe,
                todo_list_remove_directive_1.TodoListRemoveDirective,
                todo_card_complete_directive_1.TodoCardCompleteDirective,
                spinner_component_1.SpinnerComponent,
                apex_chart_component_1.ApexChartComponent,
                toast_component_1.ToastComponent,
                gallery_component_1.GalleryComponent,
                format_money_pipe_1.FormatMoneyPipe,
                stock_view_pipe_1.StockViewPipe,
                stock_limit_pipe_1.StockLimitPipe,
                stock_transfer_pipe_1.StockTransferPipe,
                productByNameAndCode_pipe_1.ProductByNameAndCodePipe,
                customerByName_pipe_1.CustomerByNamePipe,
                completeProdName_pipe_1.CompleteProdNamePipe,
                prod_measure_type_pipe_1.ProdMeasureTypePipe,
            ],
            providers: [
                { provide: common_3.LocationStrategy, useClass: common_3.HashLocationStrategy },
                {
                    provide: ngx_perfect_scrollbar_1.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                apex_chart_service_1.ApexChartService,
                toast_service_1.ToastService,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

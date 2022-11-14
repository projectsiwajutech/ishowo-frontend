"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var constant_service_1 = require("./shared/services/app/constant.service");
var card_module_1 = require("./theme/shared/components/card/card.module");
var auth_signin_module_1 = require("./components/pages/authentication/auth-signin/auth-signin.module");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var stocktransfer_service_1 = require("./shared/services/stocktransfer/stocktransfer.service");
var virtualaccount_service_1 = require("./shared/services/virtualaccount/virtualaccount.service");
var supplier_service_1 = require("./shared/services/supplier/supplier.service");
var user_service_1 = require("./shared/services/user/user.service");
var stocklimit_service_1 = require("./shared/services/stocklimit/stocklimit.service");
var stats_service_1 = require("./shared/services/stats/stats.service");
var sale_service_1 = require("./shared/services/sale/sale.service");
var product_service_1 = require("./shared/services/product/product.service");
var profil_service_1 = require("./shared/services/profil/profil.service");
var order_service_1 = require("./shared/services/order/order.service");
var compartment_service_1 = require("./shared/services/compartment/compartment.service");
var measuretype_service_1 = require("./shared/services/measuretype/measuretype.service");
var category_service_1 = require("./shared/services/category/category.service");
var app_service_1 = require("./shared/services/app/app.service");
var bank_service_1 = require("./shared/services/bank/bank.service");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_routing_module_1 = require("./app-routing.module");
var shared_module_1 = require("./theme/shared/shared.module");
var app_component_1 = require("./app.component");
var admin_component_1 = require("./theme/layout/admin/admin.component");
var auth_component_1 = require("./theme/layout/auth/auth.component");
var navigation_component_1 = require("./theme/layout/admin/navigation/navigation.component");
var nav_content_component_1 = require("./theme/layout/admin/navigation/nav-content/nav-content.component");
var nav_group_component_1 = require("./theme/layout/admin/navigation/nav-content/nav-group/nav-group.component");
var nav_collapse_component_1 = require("./theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component");
var nav_item_component_1 = require("./theme/layout/admin/navigation/nav-content/nav-item/nav-item.component");
var nav_bar_component_1 = require("./theme/layout/admin/nav-bar/nav-bar.component");
var nav_left_component_1 = require("./theme/layout/admin/nav-bar/nav-left/nav-left.component");
var nav_search_component_1 = require("./theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component");
var nav_right_component_1 = require("./theme/layout/admin/nav-bar/nav-right/nav-right.component");
var configuration_component_1 = require("./theme/layout/admin/configuration/configuration.component");
var toggle_full_screen_1 = require("./theme/shared/full-screen/toggle-full-screen");
/* Menu Items */
var navigation_1 = require("./theme/layout/admin/navigation/navigation");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var agency_service_1 = require("./shared/services/agency/agency.service");
var library_service_1 = require("./shared/services/app/library.service");
var localstorage_service_1 = require("./shared/services/app/localstorage.service");
var basic_cards_routing_module_1 = require("./demo/ui-elements/ui-basic/basic-cards/basic-cards-routing.module");
var forms_1 = require("@angular/forms");
var basic_cards_module_1 = require("./demo/ui-elements/ui-basic/basic-cards/basic-cards.module");
var success_op_modal_component_1 = require("./components/modals/success-op-modal/success-op-modal.component");
var saletarget_service_1 = require("./shared/services/sale/saletarget.service");
var orderlistsender_service_1 = require("./shared/services/app/orderlistsender.service");
var ngx_ui_loader_1 = require("ngx-ui-loader");
var customer_service_1 = require("./shared/services/customer/customer.service");
var common_2 = require("@angular/common");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                admin_component_1.AdminComponent,
                auth_component_1.AuthComponent,
                navigation_component_1.NavigationComponent,
                nav_content_component_1.NavContentComponent,
                nav_group_component_1.NavGroupComponent,
                nav_collapse_component_1.NavCollapseComponent,
                nav_item_component_1.NavItemComponent,
                nav_bar_component_1.NavBarComponent,
                nav_left_component_1.NavLeftComponent,
                nav_search_component_1.NavSearchComponent,
                nav_right_component_1.NavRightComponent,
                configuration_component_1.ConfigurationComponent,
                toggle_full_screen_1.ToggleFullScreenDirective,
                success_op_modal_component_1.SuccessOpModalComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                shared_module_1.SharedModule,
                ng_bootstrap_1.NgbDropdownModule,
                ng_bootstrap_1.NgbTooltipModule,
                ng_bootstrap_1.NgbButtonsModule,
                http_2.HttpClientModule,
                auth_signin_module_1.AuthSigninModule,
                basic_cards_module_1.BasicCardsModule,
                forms_1.FormsModule,
                basic_cards_routing_module_1.BasicCardsRoutingModule,
                shared_module_1.SharedModule,
                ngx_ui_loader_1.NgxUiLoaderModule,
                card_module_1.CardModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbTabsetModule
            ],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                common_2.DatePipe,
                ng_bootstrap_1.NgbActiveModal,
                navigation_1.NavigationItem, agency_service_1.AgencyService, bank_service_1.BankService, app_service_1.AppService, category_service_1.CategoryService, measuretype_service_1.MeasureTypeService, saletarget_service_1.SaleTargetService,
                compartment_service_1.CompartmentService, order_service_1.OrderService, profil_service_1.ProfileService, product_service_1.ProductService, sale_service_1.SaleService, stats_service_1.StatsService,
                stocklimit_service_1.StockLimitService, constant_service_1.ConstantService, user_service_1.UserService, supplier_service_1.SupplierService, customer_service_1.CustomerService, virtualaccount_service_1.VirtualAccountService,
                stocktransfer_service_1.StockTransferService, library_service_1.LibraryService, localstorage_service_1.LocalStorageService, orderlistsender_service_1.OrderListSender
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

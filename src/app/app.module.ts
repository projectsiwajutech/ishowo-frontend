import { ConstantService } from './shared/services/app/constant.service';
import { CardModule } from './theme/shared/components/card/card.module';
import { AuthSigninModule } from './components/pages/authentication/auth-signin/auth-signin.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StockTransferService } from './shared/services/stocktransfer/stocktransfer.service';
import { VirtualAccountService } from './shared/services/virtualaccount/virtualaccount.service';
import { SupplierService } from './shared/services/supplier/supplier.service';
import { UserService } from './shared/services/user/user.service';
import { StockLimitService } from './shared/services/stocklimit/stocklimit.service';
import { StatsService } from './shared/services/stats/stats.service';
import { SaleService } from './shared/services/sale/sale.service';
import { ProductService } from './shared/services/product/product.service';
import { ProfileService } from './shared/services/profil/profil.service';
import { OrderService } from './shared/services/order/order.service';
import { CompartmentService } from './shared/services/compartment/compartment.service';
import { MeasureTypeService } from './shared/services/measuretype/measuretype.service';
import { CategoryService } from './shared/services/category/category.service';
import { AppService } from './shared/services/app/app.service';
import { BankService } from './shared/services/bank/bank.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';


import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbActiveModal, NgbButtonsModule, NgbDropdownModule, NgbModal, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgencyService } from './shared/services/agency/agency.service';
import { LibraryService } from './shared/services/app/library.service';
import { LocalStorageService } from './shared/services/app/localstorage.service';
import { BasicCardsRoutingModule } from './demo/ui-elements/ui-basic/basic-cards/basic-cards-routing.module';
import { FormsModule } from '@angular/forms';
import { BasicCardsModule } from './demo/ui-elements/ui-basic/basic-cards/basic-cards.module';
import { SuccessOpModalComponent } from './components/modals/success-op-modal/success-op-modal.component';
import { SaleTargetService } from './shared/services/sale/saletarget.service';
import { OrderListSender } from './shared/services/app/orderlistsender.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomerService } from './shared/services/customer/customer.service';
import { DatePipe } from '@angular/common';


// 

@NgModule({

  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    SuccessOpModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    HttpClientModule,
    AuthSigninModule,
    BasicCardsModule,
    FormsModule,
    BasicCardsRoutingModule,
    SharedModule,
    NgxUiLoaderModule,
    CardModule,
    HttpModule,
    NgbTabsetModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DatePipe,
    NgbActiveModal,
    NavigationItem, AgencyService, BankService, AppService, CategoryService, MeasureTypeService, SaleTargetService,
    CompartmentService, OrderService, ProfileService, ProductService, SaleService, StatsService,
    StockLimitService, ConstantService, UserService, SupplierService, CustomerService, VirtualAccountService,
    StockTransferService, LibraryService, LocalStorageService, OrderListSender,
  
  // 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

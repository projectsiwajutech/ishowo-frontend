import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StocksRoutingModule } from './stocks-routing.module';
import { ProductStockUpdateComponent } from './productStocks/update/product-stock-update.component';
import { ProductStockViewComponent } from './productStocks/viewdetail/product-stock-view.component';
import { ProductOnRetailComponent } from './productStocks/put-on-retail/product-on-retail.component';
import { SeuilStockCreateComponent } from './seuilStocks/create/seuil-stock-create.component';
import { SeuilStockUpdateComponent } from './seuilStocks/update/seuil-stock-update.component';
import { TranStocksCreateComponent } from './trans-stocks/create/tran-stocks-create.component';
import { TranStocksDetailsComponent } from './trans-stocks/details/tran-stocks-details.component';

@NgModule({
  declarations: [ProductStockUpdateComponent, ProductStockViewComponent, ProductOnRetailComponent, SeuilStockCreateComponent, SeuilStockUpdateComponent, TranStocksCreateComponent, TranStocksDetailsComponent],
  imports: [
    CommonModule,
    StocksRoutingModule,
    SharedModule,
  ]
})
export class StocksModule { }



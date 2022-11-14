import {ProductInStock} from "../product/productinstock";


export class GlobalReport {

  totalSell: number;
  totalOrder: number;
  totalProfit: number;
  qtySold: number;
  qtyOrder: number;
  mostSoldProd: ProductInStock;
  mostIncomeProd: ProductInStock;
  mostProfitableProd: ProductInStock;

  startDate: Date;
  endDate: Date;

}

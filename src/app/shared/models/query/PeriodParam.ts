import { ProductInStock } from './../product/productinstock';
import {Profil} from "../profil/profil";
import {ProdMeasureType} from "../prodmeasuretype/prodmeasuretype";


export class PeriodParam {

  startDate: Date;
  endDate: Date;
  product: ProdMeasureType;
  agent: Profil;
  products: ProductInStock[];

  constructor(  ) {
    this.startDate = new Date();;
    this.endDate = new Date();;
  }


}

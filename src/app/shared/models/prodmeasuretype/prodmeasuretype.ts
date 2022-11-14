
import {Product} from "../product/product";
import {MeasureType} from "../measuretype/measuretype";
import {Profil} from "../profil/profil";

export class ProdMeasureType {
  id: number;
  id_product: number;
  product: Product;
  measure_type: MeasureType;
  agent: Profil;
  //for screens
  quantity_order: number;
  purchase_price: number;
  selling_price: number;
  barcode: string;
  date_exp: any;
  is_checked: boolean;


  constructor(){
    this.id = 0; this.id_product = 0; this.product = new Product(); this.measure_type = new MeasureType();
  }
}


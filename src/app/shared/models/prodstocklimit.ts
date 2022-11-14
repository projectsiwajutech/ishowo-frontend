import { MeasureType } from "./measuretype/measuretype";
import { ProdMeasureType } from "./prodmeasuretype/prodmeasuretype";
import { Product } from "./product/product";
import { Profil } from "./profil/profil";


export class ProdStockLimit {
  id: number;
  id_product: number;
  product: Product;
  produit_measure_type: ProdMeasureType;
  agent: Profil;
  quantity: string;

  constructor(){
    this.id = 0; this.id_product = 0; this.product = new Product();
    this.produit_measure_type = new ProdMeasureType();
  }
}

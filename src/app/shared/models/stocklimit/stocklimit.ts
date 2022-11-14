import {Product} from "../product/product";
import {MeasureType} from "../measuretype/measuretype";
import {Profil} from "../profil/profil";
/**
 * Created by Utilisateur on 11/04/2017.
 */

export class StockLimit {
  id: number;
  product: Product;
  measure_type: MeasureType;
  quantity: number;
  agent: Profil;
}

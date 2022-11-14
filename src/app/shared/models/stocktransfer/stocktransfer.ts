import {Profil} from "../profil/profil";
import {Compartment} from "../compartment/compartment";
import {ProductInStock} from "../product/productinstock";
/**
 * Created by Utilisateur on 12/04/2017.
 */


export class StockTransfer {
  id: number;
  agent: Profil;
  source: Compartment;
  destination: Compartment;
  date: Date;
  product_lines : ProductInStock[];
}

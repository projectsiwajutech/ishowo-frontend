

import { ProductInStock }           from '../../models/product/productinstock';
import {Compartment} from "../compartment/compartment";
import {Supplier} from "../supplier/supplier";
import {Profil} from "../profil/profil";


export class Order {
  id: number;
  agent: Profil;
  destination: Compartment;
  date: Date;
  amount: number;
  amount_paid: number;
  supplier: Supplier;
  product_lines: ProductInStock[];
  is_balanced: boolean;
}

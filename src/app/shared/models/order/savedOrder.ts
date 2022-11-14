
import { ProductInStock }           from '../../models/product/productinstock';
import {Supplier} from "../supplier/supplier";
import {Profil} from "../profil/profil";
import { Compartment } from '../compartment/compartment';


export class SavedOrder {
  id: number;
  agent: Profil;
  destination: Compartment;
  date: Date;
  amount: number;
  amount_paid: number;
  product_lines: ProductInStock[];
  is_balanced: boolean;
  title: string;
}

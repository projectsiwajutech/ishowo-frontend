import { Customer } from '../customer/customer';
import { ProductLine } from '../product/productLine';
import {Profil} from "../profil/profil";


export class Sale {
  id: number;
  agent: Profil;
  customer: Customer;
  date: Date;
  amount_original: number;
  amount_remise: number;
  amount_tva: number;
  amount_to_pay: number;
  amount_paid: number;
  taux_aib: number;
  amount_aib: number;
  remainder: number;
  with_invoice: boolean;
  rest_to_pay: number;
  lines: ProductLine[];
  is_balanced: boolean;
  reference: string;
}


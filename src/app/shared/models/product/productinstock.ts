/**
 * Created by Utilisateur on 01/04/2017.
 */

import { Compartment }           from '../../models/compartment/compartment';
import {ProdMeasureType} from '../prodmeasuretype/prodmeasuretype';

export class ProductInStock {
  id: number;
  product: ProdMeasureType;
  compartment: Compartment;
  quantity: number;
  quantity_transfer:  number;
  quantity_sell:  number;
  purchase_price: number;
  selling_price: number;
  barcode: string;
  expiration_date: Date;
  is_checked: boolean;
}

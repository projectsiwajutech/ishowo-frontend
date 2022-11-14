/**
 * Created by Utilisateur on 20/09/2021.
 */

 import { Compartment }           from '../../models/compartment/compartment';
 import {ProdMeasureType} from '../prodmeasuretype/prodmeasuretype';
import { ProductInStock } from './productinstock';

 export class ProductLine {
   id: number;
   product: ProdMeasureType;
   compartment: Compartment;
   p_achat: number;
   p_vente: number;
   mt_tva:  number;
   quantite: number;
   mt_remise: number;
   tax: string;
   ts: number;
   libellets: string;
   prod: ProductInStock;
 }


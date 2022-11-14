/**
 * Created by Utilisateur on 26/03/2017.
 */
import { Category }           from '../../models/category/category';
import { MeasureAssociation }           from '../../models/measureassociation/measureassociation';
import {ProdMeasureType} from "../prodmeasuretype/prodmeasuretype";
import {Profil} from "../profil/profil";

export class Product {
  id: number; 
  name: string;
  reference: string;
  category: Category;
  measure_types: ProdMeasureType[]
  measure_associations: MeasureAssociation[]
  agent: Profil;
 
}

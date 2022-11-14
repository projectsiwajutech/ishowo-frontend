import {Compartment} from "../compartment/compartment";
import {Category} from "../category/category";
import {MeasureType} from "../measuretype/measuretype";
import {Agency} from "../agency/agency";
import {Profil} from "../profil/profil";
/**
 * Created by Utilisateur on 14/04/2017.
 */


export class ProductParam {

  product: string;
  location: Compartment;
  agency: Agency;
  category: Category;
  measure_type: MeasureType;
  codebarre: string;

  source: Compartment;
  destination: Compartment;

  constructor(  ) {
    this.product = "";
    this.location = new Compartment();
    this.agency = new Agency();
    this.category = new Category();
    this.measure_type = new MeasureType();
    this.codebarre = "";

    this.source = new Compartment();
    this.destination = new Compartment();
  }

}

/**
 * Created by Utilisateur on 28/03/2017.
 */
import {MeasureType} from "../measuretype/measuretype";
import {Product} from "../product/product";
import {ProdMeasureType} from "../prodmeasuretype/prodmeasuretype";
/**
 * Created by Utilisateur on 26/03/2017.
 */

export class MeasureAssociation {
  id: number;
  index: number;
  bulk: ProdMeasureType;
  quantity: number;
  retail: ProdMeasureType;
}





 import { PipeTransform, Pipe } from '@angular/core';
 import {ProdMeasureType} from "../../models/prodmeasuretype/prodmeasuretype";



 @Pipe({ name: 'prodMeasureType' })
 export class ProdMeasureTypePipe implements PipeTransform {


  transform(items: ProdMeasureType[], prodName: string, measureTypeId: number) {
    if (!items || (!prodName && !measureTypeId )) {
      return items;
    }

    return items
      .filter(item =>
          //prod name
        (item.product.name.toLowerCase().indexOf(prodName.toLowerCase())>=0) &&
        //measure type
        ( (measureTypeId !== undefined && measureTypeId !== 0)?
          (item.measure_type.id === measureTypeId) : true)
      );
  }//end transform

}


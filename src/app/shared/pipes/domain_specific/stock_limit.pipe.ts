

import { PipeTransform, Pipe } from '@angular/core';
import { ProdStockLimit } from '../../models/prodstocklimit';



@Pipe({ name: 'stockLimit' })
export class StockLimitPipe implements PipeTransform {


  transform(items: ProdStockLimit[], prodName: string, measureTypeId: number) {
    if (!items || (!prodName && !measureTypeId )) {
      return items;
    }

    return items
      .filter(item =>
          //prod name
        (item.product.name.toLowerCase().indexOf(prodName.toLowerCase())>=0) &&
        //measure type
        ( (measureTypeId !== undefined && measureTypeId !== 0)?
          (item.produit_measure_type.measure_type.id === measureTypeId) : true)
      );
  }//end transform
}


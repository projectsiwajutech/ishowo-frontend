


import { PipeTransform, Pipe } from '@angular/core';
import {StockLimit} from "../../models/stocklimit/stocklimit";
import {ProdOnAlert} from "../../models/product/prodonalert";
import {ProductInStock} from "../../models/product/productinstock";



@Pipe({ name: 'prodAlert' })
export class ProdAlertPipe implements PipeTransform {


  transform(items: ProductInStock[], prodName: string, measureTypeId: number) {
    if (!items || (!prodName && !measureTypeId )) {
      return items;
    }

    return items
      .filter(item =>
          //prod name
        (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase())>=0) &&
        //measure type
        ( (measureTypeId !== undefined && measureTypeId !== 0)?
          (item.product.measure_type.id === measureTypeId) : true)
      );
  }//end transform

}


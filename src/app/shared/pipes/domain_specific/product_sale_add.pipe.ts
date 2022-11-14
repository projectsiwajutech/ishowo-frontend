

import { PipeTransform, Pipe } from '@angular/core';
import {ProductInStock} from "../../models/product/productinstock";



@Pipe({ name: 'prodSaleAdd' })
export class ProductSaleAddPipe implements PipeTransform {


  transform(items: ProductInStock[], prodName: string, prodCode: string, measureTypeId: number) {
    if (!items || (!prodName && !prodCode )) {
      return items;
    }
    if(prodName === undefined || prodName === null) { prodName = ""; }
    if(prodCode === undefined || prodCode === null) { prodCode = ""; }

    return items
      .filter(item =>
          //prod name
        ( (item.product.product.name !== null) ? (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) : true )  &&

        //product barcode

       ( (item.barcode !== null) ? (item.barcode.toLowerCase().indexOf(prodCode.toLowerCase()) >= 0) : true )  &&
 
        //measure type
        ( (measureTypeId !== undefined && measureTypeId !== 0)?
          (item.product.measure_type.id === measureTypeId) : true) &&
         //qty valid: stock available
        (item.quantity > 0)
      );
  }//end transform
}


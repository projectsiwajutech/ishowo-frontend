
/**
 * Created by DevIshowoMig on 28/07/2021.
 */

import { PipeTransform, Pipe } from '@angular/core';
import { ProductInStock } from '../../models/product/productinstock';



@Pipe({ name: 'productbyNameAndCode' })
export class ProductByNameAndCodePipe implements PipeTransform {


  transform(items: ProductInStock[], prodName: string, prodRef: string, prodQte: number) {
    if (!items || (!prodName && !prodRef && !prodQte)) {
      return items;
    }
    //check on params
    if (prodName === undefined || prodName === null) { prodName = ''; }
    if (prodRef === undefined || prodRef === null) { prodRef = ''; }
    if (prodQte === undefined || prodQte === null) { prodQte = undefined; }

    return items
      .filter(item =>
        //prod name
        (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) &&

        //codebarre
        ((prodRef !== undefined && prodRef !== '') ?
          (item.barcode.toLowerCase().indexOf(prodRef.toLowerCase()) >= 0) : true) &&

        //qte
        ((prodQte !== undefined) ?
          (JSON.stringify(item.quantity).indexOf(JSON.stringify(prodQte)) >= 0) : true)
      );
  }//end transform
}



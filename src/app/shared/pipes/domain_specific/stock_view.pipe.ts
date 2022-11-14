/**
 * Created by Utilisateur on 14/04/2017.
 */

/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';
import { ProductInStock } from "../../models/product/productinstock";



@Pipe({ name: 'stockView' })
export class StockViewPipe implements PipeTransform {


  transform(items: ProductInStock[], prodName: string, categoryId: number, measureTypeId: number,
    compartmentId: number, agencyId: number, codebarre: string) {
    if (!items || (!prodName && !categoryId && !measureTypeId && !compartmentId && !agencyId && !codebarre)) {
      return items;
    }

    let result = items
      .filter(item =>
        //prod name
        (item.product.product.name.toLowerCase().indexOf(prodName.toLowerCase()) >= 0) &&
        //category
        ((categoryId !== undefined && categoryId !== 0) ?
          (item.product.product.category.id === categoryId) : true) &&
        //measure type
        ((measureTypeId !== undefined && measureTypeId !== 0) ?
          (item.product.measure_type.id === measureTypeId) : true) &&
        //compartment
        ((compartmentId !== undefined && compartmentId !== 0) ?
          (item.compartment.id === compartmentId) : true) &&
        //agency
        ((agencyId !== undefined && agencyId !== 0) ?
          (item.compartment.agency.id === agencyId) : true) &&
        //codebarre
        ((codebarre !== undefined && codebarre !== '') ?
          (item.barcode.toLowerCase().indexOf(codebarre.toLowerCase()) >= 0) : true)
      );

    if (result === null) { result = []; }

    return result;

  }//end transform
}


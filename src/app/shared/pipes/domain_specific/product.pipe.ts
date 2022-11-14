/**
 * Created by Utilisateur on 15/04/2017.
 */

/**
 * Created by Utilisateur on 14/04/2017.
 */

/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';
import {Product} from "../../models/product/product";



@Pipe({ name: 'product' })
export class ProductPipe implements PipeTransform {


  transform(items: Product[], prodName: string, categoryId: number) {
    if (!items || (!prodName && !categoryId )) {
      return items;
    }

    return items
      .filter(item =>
          //prod name
        (item.name.toLowerCase().indexOf(prodName.toLowerCase())>=0) &&
        //category
        ( (categoryId !== undefined && categoryId !== 0)?
          (item.category.id === categoryId) : true )

      );
  }//end transform
}



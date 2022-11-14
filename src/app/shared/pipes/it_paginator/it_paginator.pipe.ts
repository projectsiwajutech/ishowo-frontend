/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';



@Pipe({ name: 'itPaginator' })
export class ItPaginatorPipe implements PipeTransform {


  transform(items: any[], startIndex: number, len: number) {
    if (!items || (!startIndex && !len )) {
      return items;
    }

    return items
      .slice(startIndex, startIndex + len);
  }//end transform

}

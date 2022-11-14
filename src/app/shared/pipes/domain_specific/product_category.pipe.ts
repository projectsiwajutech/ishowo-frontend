import { Category } from './../../models/category/category';
 import { PipeTransform, Pipe } from '@angular/core';



 @Pipe({ name: 'prodCategory' })
 export class ProdCategoryPipe implements PipeTransform {


  transform(items: Category[], prodCategory: string) {
    if (!items || (!prodCategory)) {
      return items;
    }

    return items
      .filter(item =>
          //prod cat
        (item.name.toLowerCase().indexOf(prodCategory.toLowerCase()) >=0 )
      ) ;
  }//end transform

}


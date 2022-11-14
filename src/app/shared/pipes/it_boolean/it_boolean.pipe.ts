/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';



@Pipe({ name: 'itBoolean' })
export class ItBooleanPipe implements PipeTransform {


  transform(item: boolean) {
    if (item === true) {
      return "OUI";
    }else{
      return "NON"
    }
  }//end transform

}

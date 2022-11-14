/**
 * Created by Utilisateur on 15/04/2017.
 */

/**
 * Created by Utilisateur on 15/04/2017.
 */


import { PipeTransform, Pipe } from '@angular/core';
import {StockTransfer} from "../../models/stocktransfer/stocktransfer";



@Pipe({ name: 'stockTransfer' })
export class StockTransferPipe implements PipeTransform {


  transform(items: StockTransfer[], source: number, destination: number) {
    if (!items || (!source && !destination )) {
      return items;
    }

    return items
      .filter(item =>
          //source
        ( (source !== undefined && source !== 0)?
          (item.source.id === source) : true)     &&
        //destination
        ( (destination !== undefined && destination !== 0)?
          (item.destination.id === destination) : true)
      );
  }//end transform
}


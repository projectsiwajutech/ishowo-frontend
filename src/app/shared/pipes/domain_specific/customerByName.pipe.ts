
/**
 * Created by DevIshowoMig on 28/07/2021.
 */

import { PipeTransform, Pipe } from '@angular/core';
import { Customer } from '../../models/customer/customer';



@Pipe({ name: 'customerByName' })
export class CustomerByNamePipe implements PipeTransform {


    transform(items: Customer[], customerLastName: string, customerFirtName: string) {
        if (!items || (!customerLastName && !customerFirtName)) {
            return items;
        }
        //check on params
        if (customerLastName === undefined || customerLastName === null) { customerLastName = ''; }
        if (customerFirtName === undefined || customerFirtName === null) { customerFirtName = ''; }
        return items
            .filter(item =>
                //customer Lastname
                (item.nom.toLowerCase().indexOf(customerLastName.toLowerCase()) >= 0) &&

                //customer FirstName
                (item.prenom.toLowerCase().indexOf(customerFirtName.toLowerCase()) >= 0)
            );
    }//end transform
}



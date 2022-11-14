/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';


@Pipe({ name: 'completeProdName' })
export class CompleteProdNamePipe implements PipeTransform {

    transform(value: string) {

        var newValue;

        //controle de la longueur du nom
        let valueLenght = value.length;

        if (valueLenght > 20) {
            let diff = value.length - 23;
            newValue = value.substring(0, diff)+ "...";
        } else {
            newValue = value;
        }
        return newValue;
    }

}

/**
 * Created by Utilisateur on 01/04/2017.
 */

import { PipeTransform, Pipe } from '@angular/core';



@Pipe({ name: 'formatMoney' })
export class FormatMoneyPipe implements PipeTransform {


  transform(value: any, args: any) {
    var moneyFormatted = ""; var moneyLength = 0;

    //controle de la valeur entrée
    if (value === null || value == undefined) return value;

    //sa longueur
    moneyLength = value.length;

    //inverser la chaine de caractere
    var copiedInput = new String(value);
    var inversedInput = copiedInput.split('').reverse().join('');

    //diviser en groupes de 3
    for (var i =0; i<(inversedInput.length/3); i++){
      moneyFormatted += " " + inversedInput.substring(i*3, i*3+3);
    }

    //reinverse
    var copiedFormated = new String(moneyFormatted);
    var inversedFormated = copiedFormated.split('').reverse().join('');

    return inversedFormated;
  }

}

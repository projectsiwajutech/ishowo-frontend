/**
 * Created by Utilisateur on 31/03/2017.
 */

/**
 * Created by Utilisateur on 29/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProductInStock } from "../../models/product/productinstock";
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Injectable()
export class LibraryService {


  private limitTable: number[] = [5, 10, 20, 30];
  private pageLimit: number = 5;

  constructor(private http: Http) { }

  //get service error text
  getServiceErrorText(error: any): string {
    let errorText: string = "";
    switch (error.status) {
      case 400: errorText = error._body; break;
      //case 400: errorText = error._body; break;
      default: errorText = "Une erreur est survenue. Veuillez réessayer"; break;
    }
    return errorText;
  }//fin getServiceErrorText

  //get list of possible limit on paginators
  getPaginatorLimitList(): number[] {
    return this.limitTable;
  }//fin getPaginatorLimitList

  //get list of possible limit on paginators
  getPaginatorDefaultLimit(): number {
    return this.pageLimit;
  }//fin getPaginatorDefaultLimit

  //check phone number
  checkPhoneNumber(phoneNumber :any){
    let result = /^(?:9[01456789]|6[0123456789]|5[01234])[0-9]{6}$/.test(phoneNumber);
    if (!result) {
      return false;
    }else
    {
      return true;
    }

  }//fin check phone number

  //format Phone Number
  formatPhoneNumber(phoneNumber: any){
    let result = phoneNumber.substring(5);
      return result;
  }//fin format phone Number

  //message de succès
  onSuccess(title: string, timer: number, position: string) { 
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      customClass: { container: 'myCustomSwal' },
      icon: 'success',
      type: 'danger',
      title: title
    })
  }//fin Notification: message de succès

  //Notification: message d'erreur
  onWarning(title: string, timer: number, position: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      customClass: { container: 'myCustomSwal' },
      icon: 'warning',
      title: title
    })
  }//fin Notification: message d'erreur

  //Notification: message d'avertissement
  onError(title: string, timer: number, position: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      customClass: { container: 'myCustomSwal' },
      icon: 'error',
      title: title
    })
  }//fin Notification: message d'avertissement


  // get Good Table
  getGoodTable(tabOne: any[], tabTwo: any[]) {
    tabTwo.forEach(element => {
      let prodExist: any = tabOne.filter(prod => prod.product.product.id == element.product.product.id && prod.product.measure_type.id == element.product.measure_type.id)[0];
      if (prodExist !== undefined) {
        let index = tabOne.findIndex(prod => prod.product.product.id == element.product.product.id && prod.product.measure_type.id == element.product.measure_type.id);
        tabOne[index].quantity = element.quantity + prodExist.quantity;
        tabOne[index].purchase_price = element.purchase_price;
        tabOne[index].selling_price = element.selling_price;
        tabOne[index].date_exp = element.date_exp;
      }

      else {
        tabOne.push(element);
      }
    });
    return tabOne;
  }//Get Good Table

  copy(obj: any): any {
    return (JSON.parse(JSON.stringify(obj)));
  }//fin copy

  showMessage(content: string): void {
    return alert(content);
  }//fin showMessage

  //check valid number
  isValidNumber(value: any): boolean {
    let content: string = "" + value;
    var regexQty = /^[0-9]{1,10}$/;   //  -?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?  from dom_renderer.ts
    if (!regexQty.test(content)) {
      return false;
    } else return true;
  }//fin isValidNumber

  //pad a string
  padString(pad: string, user_str: string, pad_pos: string): string {
    if (typeof user_str === 'undefined')
      return pad;
    if (pad_pos == 'l') {
      return (pad + user_str).slice(-pad.length);
    }
    else {
      return (user_str + pad).substring(0, pad.length);
    }
  }//fin padString

  //convertit une date en chaine de caracteres
  convertDateToStringShort(date: Date): string {
    if (date === null || date === undefined) return null;

    let theYear: any = date.getFullYear();
    let theMonth: any = date.getMonth() + 1;
    theMonth = this.padString("00", theMonth, "l");
    let theDay: any = date.getDate();
    theDay = this.padString("00", theDay, "l");

    let theHour: any = date.getHours();
    theHour = this.padString("00", theHour, "l");
    let theMinute: any = date.getMinutes();
    theMinute = this.padString("00", theMinute, "l");

    //var momDate = moment(date).format();
    var result = theDay + "/" + theMonth + "/" + theYear + " ";    //+ + theHour +  ":" + theMinute //momDate.substr(8, 2) + "/" + momDate.substr(5, 2) + "/" + momDate.substr(0, 4);
    return result;
  }//fin convertDateToStringShort

  //convert 2017-05-27T00:00:00 date to Mon May 22 2017 10:10:10 GMT+0100 (Afr. centrale Ouest) javascript
  convertStrDateToJsDate(dateStr: any): Date {

    //day
    let theYear: number = parseInt(dateStr.substr(0, 4));
    //month
    let theMonth: number = parseInt(dateStr.substr(5, 2)) - 1;
    //day
    let theDay: number = parseInt(dateStr.substr(8, 2));

    let theDate: Date;
    theDate = new Date();
    theDate.setFullYear(theYear, theMonth, theDay);

    return theDate;
  }//fin convertDateToStringShort

  //get financial operation type
  getFinOperationType(type: any): string {
    switch (type) {
      case 1: return "DEPOT";
      case 2: return "RETRAIT";
      case 3: return "TRANSFERT";
      default: return "";
    }
  }//fin getFinOperationType


  //filter prod list
  filterProdList(stock_view: ProductInStock[], productSearchName: string, productSearchBarCode: string): any[] {

    let filteredList: ProductInStock[] = stock_view.filter(x => x.product.product.name.toLowerCase().indexOf(productSearchName.toLowerCase()) >= 0);

    return filteredList;

  }//end filterProdList


}


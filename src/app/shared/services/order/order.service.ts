/**
 * Created by Utilisateur on 26/03/2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Order } from '../../models/order/order';
import { AppService } from '../../services/app/app.service';
import { Profil } from "../../models/profil/profil";
import { PeriodParam } from "../../models/query/PeriodParam";
import { FileObject } from "../../models/fileobject/FileObject";
import { SavedOrder } from '../../models/order/savedOrder';

@Injectable()
export class OrderService {

  private apiUrl: string;
  private headers: Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  //get orders list
  getOrders(obj: Profil): Promise<Order[]> {
    return this.http.get(`${this.apiUrl}stock/orders/${obj.id}`)
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }//fin getOrders

  //get orders list
  getSavedOrders(obj: Profil): Promise<SavedOrder[]> {
    return this.http.get(`${this.apiUrl}stock/savedorders/${obj.id}`)
      .toPromise()
      .then(response => response.json() as SavedOrder[])
      .catch(this.handleError);
  }//fin getOrders

  //get ordersnotcompleted list
  getOrdersNotCompleted(obj: Profil): Promise<Order[]> {
    return this.http.get(`${this.apiUrl}stock/ordersnotcompleted/${obj.id}`)
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }//fin getOrdersNotCompleted

  //create order
  createOrder(obj: Order): Promise<Order> {
    return this.http
      .post(`${this.apiUrl}stock/createorder`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Order)
      .catch(this.handleError);
  }//fin createOrder

  //create order
  saveOrder(obj: SavedOrder): Promise<SavedOrder> {
    return this.http
      .post(`${this.apiUrl}stock/saveorder`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as SavedOrder)
      .catch(this.handleError);
  }//fin createOrder

  //search orders list
  searchOrders(obj: PeriodParam): Promise<Order[]> {
    return this.http.post(`${this.apiUrl}stock/searchorders`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }//fin searchOrders

  //print order list
  printOrders(obj: PeriodParam): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printorders`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printOrders

  //print order item
  printOrder(obj: Order): Promise<any> {
    //set header
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printorder`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printOrder

  //pay balance
  payBalance(obj: Order): Promise<Order> {
    return this.http.post(`${this.apiUrl}stock/payorderbalance`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }//fin payBalance

   //delete savedOrder
   deleteSavedOrder(id: number): Promise<void> {
    const url = `${this.apiUrl}stock/deletesavedorder/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteSavedOrder

}


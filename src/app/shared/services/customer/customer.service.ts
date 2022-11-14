/**
 * Created by DevIshowoMig on 13/08/2021.
 */

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppService } from '../../services/app/app.service';
import { Profil } from "../../models/profil/profil";
import { Customer } from '../../models/customer/customer';

@Injectable()
export class CustomerService {

    private apiUrl: string;
    private headers: Headers;


    constructor(private http: Http, private appService: AppService) {
        this.apiUrl = appService.getBaseUrl();
        this.headers = appService.getHeaders();
    }

    private handleError(error: any) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    //get customers list
    getCustomers(agent: Profil): Promise<Customer[]> {
        return this.http.get(`${this.apiUrl}params/customers/${agent.id}`)
            //.map(response => response.json().data as Agency[])
            .toPromise()
            .then(response => response.json() as Customer[])
            .catch(this.handleError);
    }//fin getCustomers

    //create customer
    createCustomer(obj: Customer): Promise<Customer> {
        return this.http
            .post(`${this.apiUrl}params/createcustomer`, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Customer)
            .catch(this.handleError);
    }//fin createCustomer

    //update customer
    updateCustomer(obj: Customer): Promise<Customer> {
        return this.http
            .put(`${this.apiUrl}params/updatecustomer`, JSON.stringify(obj), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Customer)
            .catch(this.handleError);
    }//fin updateCustomer

    //delete customer
    deleteCustomer(id: number): Promise<void> {
        const url = `${this.apiUrl}params/deletecustomer/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }//fin deleteCustomer


}


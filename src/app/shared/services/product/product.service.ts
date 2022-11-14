
import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../../models/product/product';
import { AppService } from '../../services/app/app.service';
import { ProductInStock } from "../../models/product/productinstock";
import { PrmProdStkView } from "../../models/query/PrmProdStkView";
import { Profil } from "../../models/profil/profil";
import { MeasureAssociation } from "../../models/measureassociation/measureassociation";
import { ProdMeasureType } from "../../models/prodmeasuretype/prodmeasuretype";
import { PeriodParam } from "../../models/query/PeriodParam";
import { FileObject } from "../../models/fileobject/FileObject";

@Injectable()
export class ProductService {

  private apiUrl: string;
  private headers: Headers;


  constructor(private http: Http, private appService: AppService) {
    this.apiUrl = appService.getBaseUrl();
    this.headers = appService.getHeaders();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  //get products list
  getProducts(agent: Profil): Promise<Product[]> {
    return this.http.get(`${this.apiUrl}params/products/${agent.id}`)
      .toPromise()
      .then(response => response.json() as Product[])
      .catch(this.handleError);
  }//fin getProducts

  //search products view
  searchProducts(agent: Profil, obj: any): Promise<Product[]> {
    return this.http.post(`${this.apiUrl}params/searchproducts/${agent.id}`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Product[])
      .catch(this.handleError);
  }//fin searchProducts

  //get products types list
  getProductTypes(agent: Profil): Promise<ProdMeasureType[]> {
    return this.http.get(`${this.apiUrl}params/producttypes/${agent.id}`)
      .toPromise()
      .then(response => response.json() as ProdMeasureType[])
      .catch(this.handleError);
  }//fin getProductTypes

  //create product
  createProduct(obj: Product): Promise<Product> {
    return this.http
      .post(`${this.apiUrl}params/createproduct`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Product)
      .catch(this.handleError);
  }//fin createProduct

  //update product
  updateProduct(obj: Product): Promise<Product> {
    return this.http
      .put(`${this.apiUrl}params/updateproduct`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Product)
      .catch(this.handleError);
  }//fin updateProduct

  //delete product
  deleteProduct(id: number): Promise<void> {
    const url = `${this.apiUrl}params/deleteproduct/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }//fin deleteProduct

  //get products stock view
  getStockView(agent: Profil): Promise<ProductInStock[]> {
    return this.http.get(`${this.apiUrl}stock/stockview/${agent.id}`)
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getStockView

  //search products stock view
  searchStockView(agent: Profil, obj: any): Promise<ProductInStock[]> {
    return this.http.post(`${this.apiUrl}stock/searchstock/${agent.id}`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin searchStockView

  //get products stock view
  getStockViewForSale(agent: Profil): Promise<ProductInStock[]> {
    return this.http.get(`${this.apiUrl}stock/stockviewforsale/${agent.id}`)
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getStockViewForSale

  //get products stock view by ame
  getStockViewForSaleByName(agent: Profil, prod: any): Promise<ProductInStock[]> {
    return this.http
      .post(`${this.apiUrl}stock/stockviewforsalebyname/${agent.id}`, JSON.stringify(prod), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getStockViewByName

  //get products stock view by ame
  getStockViewForSaleByCode(agent: Profil, prod: any): Promise<ProductInStock[]> {
    return this.http
      .post(`${this.apiUrl}stock/stockviewforsalebycode/${agent.id}`, JSON.stringify(prod), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getStockViewByCode

  //print stock view
  printStockView(obj: Profil): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printstockview`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printStockView

  //update product stock view
  updateStockView(obj: ProductInStock, user: Profil): Promise<ProductInStock> {
    return this.http
      .put(`${this.apiUrl}stock/updatestockview/${user.id}`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ProductInStock)
      .catch(this.handleError);
  }//fin updateStockView

  //expand product stock view
  expandStockView(obj: ProductInStock, user: Profil): Promise<ProductInStock> {
    return this.http
      .put(`${this.apiUrl}stock/expandstockview/${user.id}`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ProductInStock)
      .catch(this.handleError);
  }//fin expandStockView

  //get single product stock view
  getProductStockView(obj: PrmProdStkView): Promise<ProductInStock[]> {
    return this.http.post(`${this.apiUrl}stock/productstockview`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getProductStockView

  //delete measure type for product
  deleteProdMeasureType(measType: ProdMeasureType): Promise<ProdMeasureType> {
    return this.http
      .put(`${this.apiUrl}params/deleteprodmeasuretype`, JSON.stringify(measType), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ProdMeasureType)
      .catch(this.handleError);
  }//fin deleteProdMeasureType

  //delete product association
  deleteProdAssociation(prodAss: MeasureAssociation): Promise<Product> {
    return this.http
      .put(`${this.apiUrl}params/deleteprodassociation`, JSON.stringify(prodAss), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Product)
      .catch(this.handleError);
  }//fin deleteProdAssociation

  //print barcodes
  printBarCodes(obj: PeriodParam): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
    let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

    return this.http.post(`${this.apiUrl}report/printbarcodes`, JSON.stringify(obj), options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }//fin printBarCodes

    //print barcodes
    generateBarCodes(obj: ProductInStock[], user: Profil): Promise<any> {

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
      let options = new RequestOptions({ headers: headers }); options.responseType = ResponseContentType.Blob;

      return this.http.post(`${this.apiUrl}stock/generatebarcodes`, JSON.stringify(obj), options)
        .toPromise()
        .then(response => response)
        .catch(this.handleError);
    }//fin printBarCodes

  //get stock epired
  getStockExpired(obj: PeriodParam, user: Profil): Promise<ProductInStock[]> {
    return this.http
      .post(`${this.apiUrl}stock/stockexpired/${user.id}`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as ProductInStock[])
      .catch(this.handleError);
  }//fin getStockExpired

  //generate barcodes
  generateBarCode(obj: Profil): Promise<FileObject> {
    return this.http.post(`${this.apiUrl}report/printstockview`, JSON.stringify(obj), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as FileObject)
      .catch(this.handleError);
  }//fin generateBarCode


}

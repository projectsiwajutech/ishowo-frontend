
import { Injectable } from '@angular/core';
import { Headers, Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment.prod';
//  import { ConfigureService } from 'ng4-configure/ng4-configure';


@Injectable()
export class AppService {

  private IDLE_DURATION = 1800; private TIME_OUT = 3600; private KEEP_ALIVE = 1800;
  private apiUrl = environment.apiUrl; 
  private headers = new Headers({'Content-Type': 'application/json'});
  private fileUrl = environment.fileUrl; 
  private resourceUrl = environment.resourceUrl; 
  private uploadLogoUrl = environment.uploadLogoUrl;
  
  private licenceUrl =  environment.licenceUrl; 
  

  constructor(private http: Http, 
  // public configService: ConfigureService
  ) {
  }

  getBaseUrl() : string{
    return this.apiUrl;
  }// fin getBaseUrl

  getHeaders() : Headers{
    return this.headers;
  }//fin getHeaders

  getFileUrl() : string{
    return this.fileUrl;
  }//fin getFileUrl

  getResourceUrl() : string{
    return this.resourceUrl;
  }//fin getResourceUrl

  getLogoUploadUrl() : string{
    return this.apiUrl + "params/uploadlogo/";
  }//fin getLogoUploadUrl

  getLicenceUrl() : string{
    return this.licenceUrl;
  }//fin getLicenceUrl

    getIdleDuration() : number{
    return this.IDLE_DURATION;
  }//fin getIdleDuration

    getTimeOut() : number{
    return this.TIME_OUT;
  }//fin getTimeOut

    getKeepAlive() : number{
    return this.KEEP_ALIVE;
  }//fin getKeepAlive


}


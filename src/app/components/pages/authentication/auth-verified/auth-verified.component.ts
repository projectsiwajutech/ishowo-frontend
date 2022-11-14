import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { ActivatedRoute , Route} from '@angular/router';
import { LibraryService } from 'src/app/shared/services/app/library.service';


@Component({
  selector: 'app-auth-verified',
  templateUrl: './auth-verified.component.html',
  styleUrls: ['./auth-verified.component.scss']
})
export class AuthVerifiedComponent implements OnInit {
  isLoading: boolean = false; 
  message : string = "";
  response : string ="";

  constructor(private ngxService: NgxUiLoaderService,
     private locStorService: LocalStorageService,
        private profilService: ProfileService, 
        private route : ActivatedRoute,
    private libraryService: LibraryService,
    ) {

     this.route.data.subscribe(routeResponse => {
       let params = this.route.snapshot.params['slug'];
       this.message = params;
       this.ngxService.start();
     })
   }

  ngOnInit() {
    this.saveVerification()
  }

  saveVerification(){
    this.profilService.saveVerification(this.message)
    .then(
      (result: any) => {
        console.log(result)
        this.isLoading = false;   
        if (result.message !== "") {
          this.ngxService.stop();
          this.libraryService.onWarning(result.message, 5000, 'top-end'); return;
        } else {
          this.response = result.data;
          this.isLoading = true;
          this.ngxService.stop();
        }
      },
      error => {
        this.isLoading = false;
        if (error.status === 401) {
          this.ngxService.stop();
          this.libraryService.onWarning(error._body, 5000, 'top-end'); return;
        } else {
          this.ngxService.stop();
          this.libraryService.onWarning('Une erreur est survenue', 5000, 'top-end'); return;
        }
      }
    );
  }

}

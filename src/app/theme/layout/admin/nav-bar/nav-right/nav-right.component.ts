import { LocalStorageService } from './../../../../../shared/services/app/localstorage.service';
import { Profil } from './../../../../../shared/models/profil/profil';
import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {
user: Profil;
  constructor(
    private locStorService : LocalStorageService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.locStorService.getUser();
  }

  logout(){
    this.ngxService.start();
    let link = ['auth/connection'];
    localStorage.clear();
    this.router.navigate(link);
    this.ngxService.stop();
  }
}

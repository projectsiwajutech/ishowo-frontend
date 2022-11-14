import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }
removeCss : boolean = false;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

   //get currentURL
   getcurrentURL() {
    let currentURL = this.router.url;
    if (currentURL === '/stocks/listnew') {
      this.removeCss = true;
    } else if (currentURL !== '/stocks/listnew') {
      this.removeCss = false;
    }
  }
}

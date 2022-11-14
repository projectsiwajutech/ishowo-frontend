import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router : Router,
  ) {
   }

  ngOnInit(): void {
  }

  goOne(){
    this.router.navigate(['/stocks/listnew']);
  }
  goTwo(){
    this.router.navigate(['/stocks/orderslist']);
  }
  goThree(){
    this.router.navigate(['/stocks/stockProducts']);
  }
  goFour(){
    this.router.navigate(['/stocks/barresCodes']);
  }
  goFive(){
    this.router.navigate(['/stocks/printbarresCodes']);
  }
  goSix(){
    this.router.navigate(['/stocks/transStocks']);
  }
  goSeven(){
    this.router.navigate(['/stocks/seuilStocks']);
  }
  goLast(){
    this.router.navigate(['/stocks/hsProducts']);
  }

}

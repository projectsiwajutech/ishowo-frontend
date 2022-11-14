/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'message-area',
  templateUrl: './message.area.component.html',
  //styleUrls: ['./message.area.component.css']

})

export class MessageAreaComponent implements OnInit{

  @Input() completed : boolean = false;
  @Input() acting : boolean = false;
  @Input() success : boolean = false;

  @Input() visible : boolean = false;

  @Input() title : string = "";
  @Input() message : string = "";

  @Output() changed = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void{
    //this.visible = false;
  }

  showError() : void{
    this.success = false;

  }

  showSuccess() : void{
    this.success = true;
  }

}

/**
 * Created by Utilisateur on 28/03/2017.
 */

/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/map';

import {MeasureType} from '../../../../models/measuretype/measuretype';
import {MeasureTypeService} from '../../../../services/measuretype/measuretype.service';

@Component({
  selector: 'it-measuretype-delete',
  templateUrl: './measuretype.delete.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class MeasureTypeDeleteComponent implements OnInit, OnChanges{

  constructor(
    private measureTypeService: MeasureTypeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  visible: boolean = false;
  @Input() item: MeasureType = null;
  @Input() subject: string;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() deleted = new EventEmitter<string>();

  ngOnInit(): void{
    //this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void{
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  delete(){
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
    this.measureTypeService.deleteMeasureType(this.item.id)
      .then(
        result => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.deleted.emit("deleted");
        },
        error => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }


}

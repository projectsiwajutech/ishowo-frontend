/**
 * Created by Utilisateur on 28/03/2017.
 */


import {Component, Input, Output, OnInit, OnChanges, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import {Category} from '../../../../models/category/category';
import {CategoryService} from '../../../../services/category/category.service';

@Component({
  selector: 'it-category-update',
  templateUrl: './category.update.component.html',
  //styleUrls: ['./agencies.component.css']

})

export class CategoryUpdateComponent implements OnInit, OnChanges{

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  visible: boolean = false;
  @Input() item: Category = null;
  @Input() subject: string;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() updated = new EventEmitter<string>();

  ngOnInit(): void{
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void{
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  save(form : any){
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.categoryService.updateCategory(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = null;;
          this.updated.emit("updated");
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }


}

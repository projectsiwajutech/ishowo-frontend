// import { HostListener } from '@angular/core';

// import {Component, Input, Output, OnInit, EventEmitter  } from '@angular/core';
// import { ActivatedRoute, Params }   from '@angular/router';
// import { Location }                 from '@angular/common';
// import 'rxjs/add/operator/map';

// import {Category} from '../../../../models/category/category';
// import {CategoryService} from '../../../../services/category/category.service';
// import {Profil} from "../../../../models/profil/profil";
// import {LocalStorageService} from "../../../../services/app/localstorage.service";
// import {KEY_CODE} from "../../../../models/browser/KEY_CODE";

// @Component({
//   selector: 'it-category-create',
//   templateUrl: './category.create.component.html',
//   //styleUrls: ['./agencies.component.css']

// })

// export class CategoryCreateComponent implements OnInit{

//   @Input() subject: string;
//   item: Category;

//   visible: boolean = false;
//   isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
//   statusMessage: string = "";

//   @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

//   //user connected
//   user: Profil;

//   constructor(
//     private categoryService: CategoryService,
//     private locStorService: LocalStorageService,
//     private route: ActivatedRoute,
//     private location: Location
//   ) {}

//   ngOnInit(): void{
//     this.user = this.locStorService.getUser();
//   }

//   //create object
//   save(form : any){
// 	var data = {"name": form.name};
// 	this.item = new Category(); this.item.name = form.name;
//   this.item.agent = this.user;
// 	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";

//     this.categoryService.createCategory(this.item)
//       .then(
//         result => {
//           this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
//           this.visible = false;

//           this.item = result;
//           this.created.emit("created");
//         },
//         error => {
//           this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
//         }
//       );
//   }

//   //show creation form
//   showCreationForm() : void {
//     this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
//     this.visible = true;
//   }

//   //hide the form
//   hideForm() : void {
//     this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
//     this.visible = false;
//   }

//      @HostListener('window:keyup', ['$event'])
//   keyEvent(event: KeyboardEvent) {
//     if (event.keyCode === KEY_CODE.ADD) {
//       this.showCreationForm();
//     }
//     if (event.keyCode === KEY_CODE.ESC) {
//       this.hideForm();
//     }
//   }


// }

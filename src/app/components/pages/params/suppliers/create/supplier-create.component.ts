import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Supplier } from 'src/app/shared/models/supplier/supplier';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { SupplierService } from 'src/app/shared/services/supplier/supplier.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.scss']
})
export class SupplierCreateComponent implements OnInit{

  @Input() subject: string;
  item: Supplier;

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router : Router,
    public activeModal: NgbActiveModal,
    private supplierService: SupplierService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}



  ngOnInit(): void{
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
  }

  //create object
  save(form : any){
	var data = {"name": form.name, "address": form.address};
	this.item = new Supplier(); this.item.name = form.name; this.item.address = form.address;
  this.item.phone = form.phone; this.item.email = form.email;
  this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";

    this.supplierService.createSupplier(this.item)
      .then(
        result => {
          this.show = true;
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = result;
          this.created.emit("created");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }

  //show creation form
  showCreationForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm() : void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
  }
 //Enregistrement réussie
 successSwal() {
  Swal.fire({
    customClass: { container: 'myCustomSwal'},
    title: 'Enregistrement réussi!',
    showConfirmButton: false,
    icon : "success",
    timer: 1100,
    timerProgressBar: true,
  })
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
  });
}

 //Echec de l'enregistrement
errorSwal() {
  Swal.fire('Echec de l\'Enregistrement', '', 'error');
  let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
}

  //Fermeture
  close() {
    this.created.emit("created");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("supplier_name").focus();
   }

}

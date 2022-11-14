import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Supplier } from 'src/app/shared/models/supplier/supplier';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import { Customer } from 'src/app/shared/models/customer/customer';
import { LibraryService } from 'src/app/shared/services/app/library.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  @Input() subject: string;
  item: Customer;

  show: boolean = false;
  is_checked: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
  }

  //create object
  save(form: any) {
    //si c'est une enterprise
    this.show = true;
    if (this.is_checked) {
      if (form.social_reason === "" || form.num_ifu === "") {
        this.libraryService.onWarning('Raison Sociale et Numéro IFU Obligatoires!', 1000, 'top-end');
      } else {
        this.item = new Customer(); this.item.social_reason = form.social_reason; this.item.num_ifu = form.num_ifu;
        this.item.telephone = form.phone; this.item.email = form.email;
        this.item.whatsapp = form.whatsapp; this.item.date_creation = new Date();
      }
    }
    //si c'est une personne
    else if (!this.is_checked) {
      if (form.lastName === "" || form.firstName === "") {
        return this.libraryService.onWarning('Nom et Prénom(s) Obligatoires!', 1000, 'top-end');
      } else {
        this.item = new Customer(); this.item.nom = form.nom; this.item.prenom = form.prenom;
        this.item.telephone = form.phone; this.item.email = form.email;
        this.item.whatsapp = form.whatsapp; this.item.date_creation = new Date();
      }
    }
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";

    this.customerService.createCustomer(this.item)
      .then(
        result => {
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
  showCreationForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
  }
  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Enregistrement réussi!',
      showConfirmButton: false,
      icon: "success",
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
    document.getElementById("customer_name").focus();
  }

  // OnchangeStatut of Devis Switch
  OnchangeStatut($event) {
    this.is_checked = $event.target.checked;
  } //fin OnchangeStatut of Devis Switch

}

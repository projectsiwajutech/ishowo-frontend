import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/shared/models/customer/customer';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CustomerService } from 'src/app/shared/services/customer/customer.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { LibraryService } from 'src/app/shared/services/app/library.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],

})
export class NewCustomerComponent implements OnInit {

  selectedUpObject: Customer;
  selectedDelObject: Customer;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;

  //user connected
  dtOptions: any;
  user: Profil;
  item: Customer;

  //state indicators
  show: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  //enregistrement entreprise
  is_checked: boolean = false;

  //customer
  customers: Customer[] = [];
  customerLastName: string;
  customerFirstName: string;
  customerRS: string;

  constructor(
    public activeModal: NgbActiveModal,
    public toastEvent: ToastService,
    private customerService: CustomerService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getCustomers();
  }

  //get list of customers
  getCustomers(): void {
    this.isLoading = true; this.customers = [];
    this.customerService.getCustomers(this.user)
      .then(
        customers => {
          this.isLoading = false;
          this.customers = customers;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getCustomers

  //save selected Client
  SaveSelectedCustomer(customer: Customer) {
    this.locStorService.saveToSession('Customer', customer);
    this.close();
  }//fin save selected Client

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //create customer
  save(form: any) {
    //si c'est une enterprise
    if (this.is_checked) {
      if (form.social_reason === "" || form.num_ifu === "") {
        this.libraryService.onWarning('Raison Sociale et Numéro IFU Obligatoires!', 1000, 'top-end');
      } else {
        this.item = new Customer(); this.item.social_reason = form.social_reason; this.item.num_ifu = form.num_ifu;
        this.item.telephone = form.telephone; this.item.email = form.email;
        this.item.whatsapp = form.whatsapp; this.item.date_creation = new Date();
      }
    }
    //si c'est une personne
    else if (!this.is_checked) {
      if (form.lastName === "" || form.firstName === "") {
        return this.libraryService.onWarning('Nom et Prénom(s) Obligatoires!', 1000, 'top-end');
      } else {
        this.item = new Customer(); this.item.nom = form.lastName; this.item.prenom = form.firstName;
        this.item.telephone = form.telephone; this.item.email = form.email;
        this.item.whatsapp = form.whatsapp; this.item.date_creation = new Date();
      }
    }

    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.customerService.createCustomer(this.item)
      .then(
        result => {
          this.show = true;
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.item = result;
          this.show = false;
          this.activeModal.close();
          this.successSwal(this.item);
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin create customer

  //Fermeture
  close() {
    this.activeModal.close();
  }//end close

  //Enregistrement réussie
  successSwal(customer: Customer) {
    this.locStorService.saveToSession('Customer', customer);
    this.close();
    this.libraryService.onSuccess('Nouveau Client Enregistré avec succès!',1200,'top-end');
  }

  //Echec de l'enregistrement
  errorSwal() {
    Swal.fire('Echec de l\'Enregistrement', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }

  // OnchangeStatut of Devis Switch
  OnchangeStatut($event) {
    this.is_checked = $event.target.checked;
  } //fin OnchangeStatut of Devis Switch
}

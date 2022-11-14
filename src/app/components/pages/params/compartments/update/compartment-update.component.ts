import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Profil } from 'src/app/shared/models/profil/profil';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-compartment-update',
  templateUrl: './compartment-update.component.html',
  styleUrls: ['./compartment-update.component.scss']
})
export class CompartmentUpdateComponent implements OnInit, OnChanges {

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Compartment;
  @Input() subject: string;

  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";
  agencies: Agency[] = [];

  @Output() updated = new EventEmitter<string>();

  //user connected
  user: Profil;

  constructor(
    private router : Router,
    public activeModal: NgbActiveModal,
    private agencyService: AgencyService,
    private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.getAgencies();
  }

  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    if (this.agencies.length !== 0) { this.selectAgency(); } else { this.getAgencies(); }
     
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.agent = this.user;
    this.compartmentService.updateCompartment(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.item = null;;
          this.updated.emit("updated");
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
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.item = null;
  }

  //select an agency
  selectAgency(): void {
    if (this.agencies === null || this.agencies === undefined) return;
    if (this.agencies.length !== 0) {
      if (this.item === null || this.item === undefined) this.item = new Compartment();

      this.item.agency = this.agencies.filter(agency => agency.id === this.item.agency.id)[0];
    }
  }//fin selectAgency

  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
          this.selectAgency();
        },
        error => {
        }
      );
  }//fin getAgencies

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
    this.updated.emit("updated");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("compartment_name").focus();
   }
}
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agency } from 'src/app/shared/models/agency/agency';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Profil } from 'src/app/shared/models/profil/profil';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-compartment-create',
  templateUrl: './compartment-create.component.html',
  styleUrls: ['./compartment-create.component.scss']
})
export class CompartmentCreateComponent implements OnInit, OnChanges{

  @Input() subject: string;
  item: Compartment;
  agencies: Agency[];

  show: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private agencyService: AgencyService,
    private compartmentService: CompartmentService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void{
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new Compartment();
    this.getAgencies();
  }

  ngOnChanges(): void{
    this.item = new Compartment();
  }//end ngOnChanges

  //create object
  save(form : any){
    this.show = true;
    this.item = new Compartment(); this.item.name = form.name; this.item.agency = form.agency;
    this.item.agent = this.user;
	this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.compartmentService.createCompartment(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Compartment();
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
    this.item = new Compartment();
  }

  //get list of agencies
  getAgencies(): void {
    this.agencies = [];
    this.agencyService.getAgencies(this.user)
      .then(
        agencies => {
          this.agencies = agencies;
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
    this.created.emit("created");
    this.activeModal.close();
  }//end close

  onLoadFocus() {
    document.getElementById("compartment_name").focus();
   }
}

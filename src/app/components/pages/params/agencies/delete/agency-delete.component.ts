import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agency } from 'src/app/shared/models/agency/agency';
import { AgencyService } from 'src/app/shared/services/agency/agency.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-agency-delete',
  templateUrl: './agency-delete.component.html',
  styleUrls: ['./agency-delete.component.scss']
})
export class AgencyDeleteComponent implements OnInit, OnChanges{

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private agencyService: AgencyService,
    private route: ActivatedRoute,
  ) {}

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Agency = null;
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
    this.show=true;
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
    this.agencyService.deleteAgency(this.item.id)
      .then(
        result => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;
          this.item = null;
          this.deleted.emit("deleted");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = false; this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
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

   //Suppression réussie
   successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal'},
      title: 'Suppression réussie!',
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
  
   //Echec de la Suppression
  errorSwal() {
    Swal.fire('Echec de la Suppression!', '', 'error');
    let newRouterLink = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([newRouterLink]);
    });
  }
  
    //Fermeture
    close() {
      this.deleted.emit("deleted");
      this.activeModal.close();
    }//end close

}

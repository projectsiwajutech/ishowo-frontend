import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { SaleTargetService } from 'src/app/shared/services/sale/saletarget.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-saletarget-delete',
  templateUrl: './saletarget-delete.component.html',
  styleUrls: ['./saletarget-delete.component.scss']
})
export class SaletargetDeleteComponent implements OnInit, OnChanges{

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private saleTargetService: SaleTargetService,
    private libraryService: LibraryService,
    private route: ActivatedRoute,
  ) {}

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Compartment = null;
  @Input() subject: string;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() deleted = new EventEmitter<string>();

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  delete(){
    this.show=true;
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
    this.saleTargetService.deleteSaleTarget(this.item.id)
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
          this.isDeleting = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
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

  //Suppression r??ussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal'},
      title: 'Suppression r??ussie!',
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

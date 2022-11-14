import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasureType } from 'src/app/shared/models/measuretype/measuretype';
import { MeasureTypeService } from 'src/app/shared/services/measuretype/measuretype.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-measuretype-update',
  templateUrl: './measuretype-update.component.html',
  styleUrls: ['./measuretype-update.component.scss']
})
export class MeasuretypeUpdateComponent implements OnInit, OnChanges {

  constructor(
    private router : Router,
    public activeModal: NgbActiveModal,
    private measureTypeService: MeasureTypeService,
    private route: ActivatedRoute,
  ) { }

  show: boolean = false;
  visible: boolean = false;
  @Input() item: MeasureType = null;
  @Input() subject: string;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() updated = new EventEmitter<string>();

  ngOnInit(): void {
    this.onLoadFocus();
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  ngOnChanges(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  save(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.measureTypeService.updateMeasureType(this.item)
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
    document.getElementById("measuretype_name").focus();
   }
}
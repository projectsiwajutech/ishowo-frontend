import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements OnInit {

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
  ) {}
  @Input() item: any = 0;
  show: boolean = false;
  visible: boolean = false;
  isDeleting: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  ngOnInit(): void{
  }

  ngOnChanges(): void{
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //create object
  delete(){
    this.show=true;
    this.isDeleting = true; this.isCompleted = false; this.statusMessage = "";
  }

  //show creation form
  showCreationForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
  }

  //hide the form
  hideForm() : void {
    this.isDeleting = false; this.isCompleted = false; this.isSuccess = false;
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
        this.activeModal.close();
      }//end close

}

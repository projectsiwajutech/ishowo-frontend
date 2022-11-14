import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product/product';
import { ProductService } from 'src/app/shared/services/product/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit, OnChanges{

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  show: boolean = false;
  visible: boolean = false;
  @Input() item: Product = null;
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
    this.productService.deleteProduct(this.item.id)
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

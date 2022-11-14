import { ProductInStock } from 'src/app/shared/models/product/productinstock';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Compartment } from 'src/app/shared/models/compartment/compartment';
import { Supplier } from 'src/app/shared/models/supplier/supplier';
import { CompartmentService } from 'src/app/shared/services/compartment/compartment.service';
import { SupplierService } from 'src/app/shared/services/supplier/supplier.service';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Order } from 'src/app/shared/models/order/order';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Category } from 'src/app/shared/models/category/category';
import { Product } from 'src/app/shared/models/product/product';
import { ProdMeasureType } from 'src/app/shared/models/prodmeasuretype/prodmeasuretype';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { SavedOrder } from 'src/app/shared/models/order/savedOrder';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SavedOrdersListComponent } from './saved-orders-list/saved-orders-list.component';

@Component({
  selector: 'app-newcommande-list',
  templateUrl: './newcommande-list.component.html',
  styleUrls: ['./newcommande-list.component.scss']
})
export class NewcommandeListComponent implements OnInit {

  OrderListProducts: ProductInStock[] = [];
  dataIsAvailable;
  sum: any = 0;

  //list
  compartments: Compartment[] = [];
  suppliers: Supplier[] = [];
  categories: Category[] = [];
  products: Product[] = [];
  measureTypes: ProdMeasureType[] = [];
  productsTypes: ProdMeasureType[] = [];
  item: Order;
  saveItem: SavedOrder;
  user: Profil;


  //selected objects
  selectedCategory: Category;
  selectedProduct: Product;
  productsBycat: Product[]; filteredProducts: any[] = [];
  selectedMeasureType: ProdMeasureType; quantity: number; purchase_price: number; selling_price: number;
  code_barre: string = ""; exp_date: Date;

  //form related objects
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  constructor(
    private supplierService: SupplierService,
    private modalService: NgbModal,
    private compartmentService: CompartmentService,
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private router: Router,
    private libraryService: LibraryService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.item = new Order();
    this.saveItem = new SavedOrder();
    this.receiveOrderListProducts();
    this.getCompartments();
    this.getSuppliers();
  }


  ngOnChanges(): void {
    this.user = this.locStorService.getUser();
    this.item = new Order(); this.productsBycat = this.products;
  }//end ngOnChanges

  //create object
  save(form: any) {
    //action
    this.ngxService.start();
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.orderService.createOrder(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Order();
          this.statusMessage = "Commande crée avec succès";
          this.created.emit("created");
          window.setTimeout(() => { this.isCompleted = false; }, 1000);
          localStorage.removeItem('addedProducts');
          let newRouterLink = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([newRouterLink])
          });
          this.ngxService.stop();
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'success',
            title: 'Enregistrement Réussi !',
            text: 'Votre commande a été enregistrée avec succès.'
          })

        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          let newRouterLink = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([newRouterLink])
          });
          this.ngxService.stop();
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Echec de l\'enregistrement !',
            text: 'Une erreur est survenue. Veuillez réessayer'
          })
        }
      );
  }

  //save commande for later
  saveforLater(libelle: any) {
    //action
    this.ngxService.start();

    this.saveItem.id = 0;
    this.saveItem.agent = this.user;
    this.saveItem.destination = new Compartment();
    this.saveItem.date = new Date();
    this.saveItem.amount = 0;
    this.saveItem.amount_paid = 0;
    this.saveItem.product_lines = this.OrderListProducts;
    this.saveItem.is_balanced = false;
    this.saveItem.title = libelle;

    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.orderService.saveOrder(this.saveItem)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Order();
          window.setTimeout(() => { this.isCompleted = false; }, 1000);
          let newRouterLink = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([newRouterLink])
          });
          this.ngxService.stop();
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'success',
            title: 'Sauvegarde Enregistrée !',
            text: 'Votre sauvegarde a été enregistrée avec succès.'
          })

        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = "Une erreur est survenue. Veuillez réessayer";
          let newRouterLink = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([newRouterLink])
          });
          this.ngxService.stop();
          Swal.fire({
            customClass: { container: 'myCustomSwal' },
            icon: 'error',
            title: 'Echec de l\'enregistrement !',
            text: 'Une erreur est survenue. Veuillez réessayer'
          })
        }
      );
  }

  receiveOrderListProducts() {
    let products = this.locStorService.readFromSession('addedProducts');
    this.OrderListProducts = products;
    if ((this.OrderListProducts !== undefined) && (this.OrderListProducts !== null)) {
      if (this.OrderListProducts.length === 0) {
        this.dataIsAvailable = false;
      }
      else {
        this.dataIsAvailable = true;
      }
    }
  }
  //get list of compartments
  getCompartments(): void {
    this.compartments = [];
    this.compartmentService.getCompartments(this.user)
      .then(
        compartments => {
          this.compartments = compartments;
        },
        error => {
        }
      );
  }//fin getCompartments

  //get list of suppliers
  getSuppliers(): void {
    this.suppliers = [];
    this.supplierService.getSuppliers(this.user)
      .then(
        suppliers => {
          this.suppliers = suppliers;
        },
        error => {
        }
      );
  }//fin getSuppliers

  //modal d'ajout
  createModal() {
    this.router.navigate(['/stocks/listcreate'])
  }// end createModal

  async saveModal(form: any) {
    if ((form.supplier.id === undefined) || (form.destination.id === undefined)) {
      Swal.fire({
        customClass: { container: 'myCustomSwal' },
        title: 'Champs non Renseignés',
        text: 'Veuillez sélectionnez un fournisseur et un rayon',
        icon: 'warning'
      })
    }
    else {
      const { value: amount_paid } = await Swal.fire({
        customClass: { container: 'myCustomSwal' },
        html: '<b>Confirmez-vous ce montant ?</b>',
        imageUrl: 'assets/images/auth/ishowo.png',
        input: 'number',
        inputValue: form.amount_paid,
        showCancelButton: true,
        cancelButtonText: `Annuler`,
        reverseButtons: true,
        confirmButtonText: `Valider la Commande`,
        backdrop: `
      rgba(0,0,123,0.4)
      left top
      no-repeat
    ` });

      let formData = {
        supplier: form.supplier,
        destination: form.destination,
      }
      let get_amount_paid = amount_paid.replaceAll('"', '');
      get_amount_paid = JSON.parse(amount_paid)

      let myitem: Order = {
        id: 0,
        agent: this.user,
        destination: form.destination,
        date: new Date(),
        amount: this.getTotal(),
        amount_paid: get_amount_paid,
        supplier: form.supplier,
        product_lines: this.OrderListProducts,
        is_balanced: false
      }
      this.item = myitem;
      this.save(formData);
    }
  }

  //remove product in Lines
  RemoveProduct(id: number) {
    this.OrderListProducts.splice(id, 1);
    this.locStorService.saveToSession('addedProducts', this.OrderListProducts);
  }//fin removeproduct in Lines

  // get Total
  getTotal() {
    let sum: number = this.OrderListProducts.reduce((acc: number, cur: ProductInStock) => acc + cur.quantity * cur.purchase_price, 0);
    this.sum = sum;
    return this.sum;
  }// get Total

  async confirmProdRemoveModal(itemIndex: number) {
    await Swal.fire({
      customClass: { container: 'myCustomSwal', confirmButton: 'btn btn-danger' },
      text: 'Êtes-vous sûre de retirer ce Produit',
      imageUrl: 'assets/images/params/delete.png',
      imageHeight: 100,
      imageWidth: 100,
      showCancelButton: true,
      cancelButtonText: `<i class="fas fa-window-close"></i> Annuler`,
      confirmButtonText: `<i class="fas fa-trash-alt"></i> Oui je Retire`,
      reverseButtons: true,
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.RemoveProduct(itemIndex)
        this.libraryService.onSuccess('Produit retiré', 1200, 'top-end');
        let newRouterLink = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([newRouterLink])
        });
      }
    });
  }


  //modal d'enregistrement de sauvegarde
  async saveForLaterModal() {
    const { value: libelle } = await Swal.fire({
      customClass: { container: 'myCustomSwal' },
      html: '<b>NOM DE SAUVEGARDE</b>',
      input: 'text',
      inputPlaceholder: "Veuilez nommer votre sauvegarde",
      showCancelButton: true,
      cancelButtonText: `<i class="fas fa-window-close"></i> Annuler`,
      reverseButtons: true,
      confirmButtonText: `<i class="fas fa-save"></i> Enregistrer`,
      inputValidator: (value) => {
        if (value.length < 1) {
          return 'Nom Invalide!'
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveforLater(result.value);
      }
    });
  }
  //fin modal d'enregistrement de sauvegarde

  //modal de chargement de sauvegarde
  launchSavedOrderModal() {
   this.modalService.open(SavedOrdersListComponent,{windowClass: 'myCustomSwal', size: 'xl'});
  }
  //fin modal de chargement de sauvegarde
}



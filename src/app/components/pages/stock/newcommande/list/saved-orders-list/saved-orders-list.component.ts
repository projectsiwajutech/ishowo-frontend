import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SavedOrder } from 'src/app/shared/models/order/savedOrder';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-saved-orders-list',
  templateUrl: './saved-orders-list.component.html',
  styleUrls: ['./saved-orders-list.component.scss']
})
export class SavedOrdersListComponent implements OnInit {

  savedOrders: SavedOrder[] = [];
  selectedUpObject: SavedOrder;
  selectedDelObject: SavedOrder;

  isCreateVisible: boolean = false;
  isLoading: boolean = false;
  noData: boolean;
  page  : number = 1;
  pageSize  : number = 30;


  //user connected
  dtOptions: any;
  user: Profil;

  constructor(
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    private locStorService: LocalStorageService,
    private libraryService: LibraryService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.getSavedOrders();
  }

  //get list of saved orders
  getSavedOrders(): void {
    this.isLoading = true; this.savedOrders = [];
    this.orderService.getSavedOrders(this.user)
      .then(
        orders => {
          this.isLoading = false;
          if (orders.length === 0) { this.noData = true; } else { this.noData = false; }
          this.savedOrders = orders;
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getSavedOrders

  //track by
  trackByFn(index: number, item: any): any {
    return item.id;
  }//fin trackByFn

  //charger une sauvegarde
  launchSavedOrder(item: SavedOrder) {
    this.ngxService.start();
    if (localStorage.getItem('addedProducts')) {
      let tabOne = this.locStorService.readFromSession('addedProducts');
      let refreshTable = this.libraryService.getGoodTable(tabOne, item.product_lines);
      this.locStorService.saveToSession('addedProducts', refreshTable)
      let newRouterLink = this.router.url;
      this.ngxService.stop();
      this.activeModal.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRouterLink]);
      });
    }
    else {
      this.locStorService.saveToSession('addedProducts', item.product_lines);
      let newRouterLink = this.router.url;
      this.ngxService.stop();
      this.activeModal.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRouterLink]);
      });
    }
  }
  //charger une sauvegarde

  //suppression de sauvegarde
  deleteSavedOrder(id: number) {

    this.orderService.deleteSavedOrder(id)
      .then(
        result => {
          this.activeModal.close();
          this.libraryService.onSuccess('Sauvegarde supprimée', 1200, 'top-end');
        },
        error => {
          this.libraryService.onError('Echec de la suppression', 1200, 'top-end');
        }
      );
  }
  //fin suppression de sauvegarde

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinOperation } from 'src/app/shared/models/finoperation/finoperation';
import { Profil } from 'src/app/shared/models/profil/profil';
import { VirtualAccount } from 'src/app/shared/models/virtualaccount/virtualaccount';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { BankService } from 'src/app/shared/services/bank/bank.service';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';
import { VirtualAccountService } from 'src/app/shared/services/virtualaccount/virtualaccount.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeFinOperation } from 'src/app/shared/models/typefinoperation/typefinoperation'


@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.scss']
})
export class OperationCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  item: FinOperation;
  operation_types: string[] = [];
  accounts: VirtualAccount[];

  show: boolean = false;
  visible: boolean = false; isProfileVisible: boolean = false; isBankVisible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string = "";

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private vAccountService: VirtualAccountService,
    private bankService: BankService,
    private profilService: ProfileService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new FinOperation();
    this.operation_types = this.vAccountService.getOperationTypes();
    this.getAccounts();
  }

  ngOnChanges(): void {
    this.item = new FinOperation();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.item.agent = this.user;
    this.item.remaining = undefined;

    if (form.operation_type === "DEPOT") {
      this.item.operation_type = TypeFinOperation.DEPOT;
    } else if (form.operation_type === "RETRAIT") {
      this.item.operation_type = TypeFinOperation.RETRAIT;
    }
    this.item.operation_date = new Date();
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.vAccountService.createFinOperation(this.item)
      .then(
        result => {
          if (result === null) {
            this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
            this.statusMessage = this.libraryService.getServiceErrorText("Une erreur est survenue");
            this.show = false;
            this.activeModal.close();
            this.errorSwal();
            return;
          }
          // this.item = result;
          this.isSaving = false; this.isCompleted = true;
          this.visible = false; this.isSuccess = true;
          this.item = new FinOperation();
          this.created.emit("created");
          this.show = false;
          this.activeModal.close();
          this.successSwal();
        },
        error => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = false;
          this.statusMessage = this.libraryService.getServiceErrorText(error);
          this.show = false;
          this.activeModal.close();
          this.errorSwal();
        }
      );
  }//fin save

  //show creation form
  showCreationForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new FinOperation();
  }

  //get list of accounts
  getAccounts(): void {
    this.accounts = [];
    this.vAccountService.getVirtualAccounts(this.user)
      .then(
        accounts => {
          this.accounts = accounts;
        },
        error => {
        }
      );
  }//fin getAccounts


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
    document.getElementById("account_name").focus();
   }

}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bank } from 'src/app/shared/models/bank/bank';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { BankService } from 'src/app/shared/services/bank/bank.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss']
})
export class BankCreateComponent implements OnInit, OnChanges {

  @Input() subject: string;
  item: Bank;
  banks: Bank[];

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
    private bankService: BankService,
    private libraryService: LibraryService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.onLoadFocus();
    this.user = this.locStorService.getUser();
    this.item = new Bank();
  }

  ngOnChanges(): void {
    this.item = new Bank();
  }//end ngOnChanges

  //create object
  save(form: any) {
    this.show = true;
    this.item.agent = this.user;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.bankService.createBank(this.item)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          // /this.item = result;
          this.item = new Bank();
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
  }

  //show creation form
  showCreationForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = true;
  }

  //hide the form
  hideForm(): void {
    this.isSaving = false; this.isCompleted = false; this.isSuccess = false;
    this.visible = false;
    this.item = new Bank();
  }

  //Enregistrement réussie
  successSwal() {
    Swal.fire({
      customClass: { container: 'myCustomSwal' },
      title: 'Enregistrement réussi!',
      showConfirmButton: false,
      icon: "success",
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
    document.getElementById("name_bank").focus();
   }
}

import { GroupeHandler } from './../../../../../shared/models/groupe_handler/groupe_handler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/shared/models/group/group';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Role } from 'src/app/shared/models/role/role';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { ProfileService } from 'src/app/shared/services/profil/profil.service';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit {

  @Input() subject: string;
  item: Group;
  handler: GroupeHandler;

  show: boolean = false;
  noData: boolean = false;
  isLoading: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private locStorService: LocalStorageService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private profilService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.handler.laws = this.handler.laws.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  //save group
  updateGroup(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.handler.group.name = form.name_groupe;
    this.handler.group.reference = form.name_groupe;
    this.userService.updateGroup(this.handler.group, this.handler.laws, this.user)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Group();
          this.created.emit("created");
          this.show = false;
          this.activeModal.close();
          this.updateGroupLocalStor();
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
  //fin saveGroup

  //OnchangeRole Status
  OnchangeStatut(item: Role) {
    let role: Role = this.handler.laws.filter(prod => prod.id == item.id)[0];

    if (role.ischecked == false) {
      role.ischecked = true;
    }
    else if (role.ischecked == true) {
      role.ischecked = false;
    }
  }// fin OnchangeRole Status

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

  //close Modal
  close() {
    this.activeModal.close();
  }
  //fin close

  updateGroupLocalStor() {
    this.user = this.locStorService.getUser();
    this.profilService.getGroupRoles(this.user.group)
      .then(
        result => {
          this.locStorService.saveGroup(result);
        },
        error => {
          if (error.status === 400) {
            this.libraryService.onError(error._body, 2000, 'top-start'); return;
          }
        }
      );
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/shared/models/profil/profil';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { Group } from 'src/app/shared/models/group/group';
import { Role } from 'src/app/shared/models/role/role';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {

  @Input() subject: string;
  item: Group;

  show: boolean = false;
  roles: Role[] = [];
  noData: boolean = false;
  isLoading: boolean = false;
  visible: boolean = false;
  isSaving: boolean = false; isCompleted: boolean = false; isSuccess = false;
  statusMessage: string;

  @Output() created = new EventEmitter<string>(); //used to update the list when creation completed here

  //user connected
  user: Profil

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private locStorService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.item = new Group();
    this.getRoles();
    this.user = this.locStorService.getUser();
  }

  //save group
  saveGroup(form: any) {
    this.show = true;
    this.isSaving = true; this.isCompleted = false; this.statusMessage = "";
    this.item.name = form.name_groupe;
    this.item.reference = form.name_groupe;
    this.item.total_laws = 0;
    this.userService.createGroup(this.item, this.roles, this.user)
      .then(
        result => {
          this.isSaving = false; this.isCompleted = true; this.isSuccess = true;
          this.visible = false;

          this.item = new Group();
          this.created.emit("created");
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
  //fin saveGroup

  //get list of users
  getRoles(): void {
    this.isLoading = true; this.roles = [];
    this.userService.getRoles()
      .then(
        roles => {
          this.isLoading = false;
          if (roles.length === 0) { this.noData = true; } else { this.noData = false; }
          this.roles = roles.sort((a, b) => (a.id > b.id ? 1 : -1));
        },
        error => {
          this.isLoading = false;
        }
      );
  }//fin getUsers

  //OnchangeRole Status
  OnchangeStatut(item: Role) {
    let role: Role = this.roles.filter(prod => prod.id == item.id)[0];

    if (role.ischecked == false) {
      role.ischecked = true;
    }
    else if (role.ischecked == true) {
      role.ischecked = false;
    }
  }//fin OnchangeRole Status

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
}

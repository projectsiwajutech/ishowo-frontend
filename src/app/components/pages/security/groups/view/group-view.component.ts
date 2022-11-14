import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/shared/models/group/group';
import { GroupeHandler } from 'src/app/shared/models/groupe_handler/groupe_handler';
import { Profil } from 'src/app/shared/models/profil/profil';
import { Role } from 'src/app/shared/models/role/role';
import { LibraryService } from 'src/app/shared/services/app/library.service';
import { LocalStorageService } from 'src/app/shared/services/app/localstorage.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

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
    public activeModal: NgbActiveModal,
    private locStorService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.user = this.locStorService.getUser();
    this.handler.laws = this.handler.laws.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  //close Modal
  close() {
    this.activeModal.close();
  }
  //fin close
}


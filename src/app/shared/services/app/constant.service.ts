import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Injectable } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class ConstantService {

  constructor() {}
  
  //options d'ouverture de modal
  ModalOptionsOne: NgbModalOptions = {
    size: 'xl',
    windowClass: 'myCustomSwal',
  };
  //fin options options d'ouverture de modal
  
  // Is used for table pagination
  DtOptions : DataTables.Settings = {
    language: {
      processing:     "Traitement en cours...",
      search:         "Filtrer&nbsp;par:",
      lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
      info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix:    "",
      loadingRecords: "Chargement en cours...",
      zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable:     "Aucune donnée trouvée",
      paginate: {
        first:      "Premier",
        previous:   "Pr&eacute;c&eacute;dent",
        next:       "Suivant",
        last:       "Dernier"
      },
      aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
  }
  }
}


import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-success-op-modal',
  templateUrl: './success-op-modal.component.html',
  styleUrls: ['./success-op-modal.component.scss']
})
export class SuccessOpModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  successSwal() {
    Swal.fire('Enregistrement réussie!', '', 'succès');
    
  }

}

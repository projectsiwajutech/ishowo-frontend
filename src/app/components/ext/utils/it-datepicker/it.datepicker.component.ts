import { Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import * as moment from 'moment';
import {LibraryService} from "../../../services/app/library.service";
import {  map } from 'rxjs/operators';

@Component({
  selector: 'it-datepicker',
  templateUrl: './it.datepicker.component.html'
})

export class ItDatepickerComponent implements  OnInit{

  @Input() public dt: Date;
  //public dtFormatted: string;
  fr: any;

  private opened: boolean = false;
  private showDatePicker = false;
  @Output() selected = new EventEmitter<Date>();

  public constructor(
    private  libraryService: LibraryService
  ) {

  }

  ngOnInit(): void{
    if (this.dt === null || this.dt === undefined) {
      this.dt = new Date();
    } else {
      let aDate:any   = moment(this.dt, 'DD/MM/YYYY', true);
      let isValid: boolean = aDate.isValid();

      if(!isValid) {  //isDate(this.dt)
        this.dt = this.libraryService.convertStrDateToJsDate(this.dt);
      }
    }

    this.selected.emit(this.dt);
    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di","Lu","Ma","Me","Je","Ve","Sa"],
      monthNames: [ "Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aôut","Septembre","Octobre","Novembre","Décembre" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Avr", "Mai", "Ju","Jui", "Au", "Sep", "Oct", "Nov", "Dec" ]
    };
  }


  handleSelection(event: Date): void{
    this.dt = event;
    this.selected.emit(event);
  }


  public open(): void {
    this.opened = !this.opened;
  }


}

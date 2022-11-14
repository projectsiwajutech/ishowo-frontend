import { Component, OnInit } from '@angular/core';
import {MeasureTypeService} from "../../services/measuretype/measuretype.service";
import {MeasureType} from "../../models/measuretype/measuretype";
import {MeasureAssociation} from "../../models/measureassociation/measureassociation";
import {Profil} from "../../models/profil/profil";


@Component({
  selector: 'datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class DatepickerDemoComponent implements  OnInit{
  public theDate: Date = new Date();

  en: any;

  public constructor(
    private measureTypeService: MeasureTypeService
  ) {

  }

  ngOnInit(): void{
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Dim", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Di","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: [ "January","February","March","Avril","May","June","July","August","September","October","November","December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Avr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    };
  }

  doClick(): void{
  }





}

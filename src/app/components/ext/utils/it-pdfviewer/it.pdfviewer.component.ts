import { Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';
import {AppService} from "../../../services/app/app.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'it-pdfviewer',
  templateUrl: './it.pdfviewer.component.html',
  styleUrls: ['./it.pdfviewer.component.css']
})

export class ItPdfViewerComponent implements OnInit, OnChanges{

  pdfFile : string;
  pdfTitle : string;

  @Input() file: string;

  // set file(value: string){
  //   this.pdfFile = this.appService.getFileUrl() + value;
  // };

  @Input() title: string;
  @Input() visible: boolean = false;
  @Output() closed = new EventEmitter<boolean>();

  public constructor(
    private  appService: AppService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void{
    //this.pdfFile = this.appService.getFileUrl() + this.file;
    this.pdfTitle = this.title;
  }

  ngOnChanges(): void{
    this.pdfFile = this.file; //this.appService.getFileUrl() + 
    this.pdfTitle = this.title;
  }

  //sanitize the url
  getURL(): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfFile);
  }//fin getURL

  //close the form
  closeViewer(): void{
    this.closed.emit(false);
  }//fin closeViewer





}


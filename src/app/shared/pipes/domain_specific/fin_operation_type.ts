import { LibraryService } from './../../services/app/library.service';


import { PipeTransform, Pipe } from '@angular/core';




@Pipe({ name: 'finOpType' })
export class FinOperationTypePipe implements PipeTransform {

  constructor(
    private libraryService: LibraryService,
  ) {}

  transform(item: any) {
    return this.libraryService.getFinOperationType(item);
  }//end transform

}
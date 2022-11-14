import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcommandeListComponent } from './newcommande-list.component';

describe('NewcommandeListComponent', () => {
  let component: NewcommandeListComponent;
  let fixture: ComponentFixture<NewcommandeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcommandeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcommandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

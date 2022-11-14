import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLicenceComponent } from './change-licence.component';

describe('ChangeLicenceComponent', () => {
  let component: ChangeLicenceComponent;
  let fixture: ComponentFixture<ChangeLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLicenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentUpdateComponent } from './compartment-update.component';

describe('CompartmentUpdateComponent', () => {
  let component: CompartmentUpdateComponent;
  let fixture: ComponentFixture<CompartmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartmentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

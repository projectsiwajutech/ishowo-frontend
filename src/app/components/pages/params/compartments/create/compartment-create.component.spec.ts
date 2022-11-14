import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentCreateComponent } from './compartment-create.component';

describe('CompartmentCreateComponent', () => {
  let component: CompartmentCreateComponent;
  let fixture: ComponentFixture<CompartmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartmentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

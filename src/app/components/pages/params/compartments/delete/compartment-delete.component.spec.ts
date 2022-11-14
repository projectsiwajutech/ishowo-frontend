import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartmentDeleteComponent } from './compartment-delete.component';

describe('CompartmentDeleteComponent', () => {
  let component: CompartmentDeleteComponent;
  let fixture: ComponentFixture<CompartmentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompartmentDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

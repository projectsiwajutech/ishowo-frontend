import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeasuretypesComponent } from './measuretypes.component';

describe('EcommProductComponent', () => {
  let component: MeasuretypesComponent;
  let fixture: ComponentFixture<MeasuretypesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuretypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuretypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuretypeCreateComponent } from './measuretype-create.component';

describe('MeasuretypeCreateComponent', () => {
  let component: MeasuretypeCreateComponent;
  let fixture: ComponentFixture<MeasuretypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuretypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuretypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

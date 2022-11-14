import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuretypeDeleteComponent } from './measuretype-delete.component';

describe('MeasuretypeDeleteComponent', () => {
  let component: MeasuretypeDeleteComponent;
  let fixture: ComponentFixture<MeasuretypeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuretypeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuretypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

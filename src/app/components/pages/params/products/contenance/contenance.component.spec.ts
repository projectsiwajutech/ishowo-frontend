import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenanceComponent } from './contenance.component';

describe('ContenanceComponent', () => {
  let component: ContenanceComponent;
  let fixture: ComponentFixture<ContenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenanceListComponent } from './contenance-list.component';

describe('ContenanceListComponent', () => {
  let component: ContenanceListComponent;
  let fixture: ComponentFixture<ContenanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

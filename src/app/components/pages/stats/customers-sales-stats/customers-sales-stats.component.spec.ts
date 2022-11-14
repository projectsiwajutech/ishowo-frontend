import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSalesStatsComponent } from './customers-sales-stats.component';

describe('CustomersSalesStatsComponent', () => {
  let component: CustomersSalesStatsComponent;
  let fixture: ComponentFixture<CustomersSalesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersSalesStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSalesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

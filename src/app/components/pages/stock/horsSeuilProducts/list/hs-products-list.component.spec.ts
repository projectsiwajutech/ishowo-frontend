import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsProductsListComponent } from './hs-products-list.component';

describe('HsProductsListComponent', () => {
  let component: HsProductsListComponent;
  let fixture: ComponentFixture<HsProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HsProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HsProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

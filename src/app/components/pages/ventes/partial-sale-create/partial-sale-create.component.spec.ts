import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialSaleCreateComponent } from './partial-sale-create.component';

describe('PartialSaleCreateComponent', () => {
  let component: PartialSaleCreateComponent;
  let fixture: ComponentFixture<PartialSaleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialSaleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialSaleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUpdateComponent } from './bank-update.component';

describe('BankUpdateComponent', () => {
  let component: BankUpdateComponent;
  let fixture: ComponentFixture<BankUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

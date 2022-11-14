import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccountUpdateComponent } from './vaccount-update.component';

describe('VaccountUpdateComponent', () => {
  let component: VaccountUpdateComponent;
  let fixture: ComponentFixture<VaccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccountUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

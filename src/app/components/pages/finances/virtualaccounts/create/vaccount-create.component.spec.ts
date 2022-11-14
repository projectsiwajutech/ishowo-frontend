import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccountCreateComponent } from './vaccount-create.component';

describe('VaccountCreateComponent', () => {
  let component: VaccountCreateComponent;
  let fixture: ComponentFixture<VaccountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccountCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

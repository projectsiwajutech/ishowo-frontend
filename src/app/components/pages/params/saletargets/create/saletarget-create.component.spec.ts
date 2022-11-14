import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletargetCreateComponent } from './saletarget-create.component';

describe('SaletargetCreateComponent', () => {
  let component: SaletargetCreateComponent;
  let fixture: ComponentFixture<SaletargetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletargetCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaletargetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

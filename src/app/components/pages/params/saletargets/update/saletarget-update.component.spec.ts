import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletargetUpdateComponent } from './saletarget-update.component';

describe('SaletargetUpdateComponent', () => {
  let component: SaletargetUpdateComponent;
  let fixture: ComponentFixture<SaletargetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletargetUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaletargetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

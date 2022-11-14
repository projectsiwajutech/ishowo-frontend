import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDeleteComponent } from './agency-delete.component';

describe('AgencyDeleteComponent', () => {
  let component: AgencyDeleteComponent;
  let fixture: ComponentFixture<AgencyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

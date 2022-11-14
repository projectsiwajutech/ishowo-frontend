import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthVerifiedComponent } from './auth-verified.component';

describe('AuthVerifiedComponent', () => {
  let component: AuthVerifiedComponent;
  let fixture: ComponentFixture<AuthVerifiedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

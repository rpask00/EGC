import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SignupSuccedComponent} from './signup-succed.component';

describe('SignupSuccedComponent', () => {
  let component: SignupSuccedComponent;
  let fixture: ComponentFixture<SignupSuccedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSuccedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

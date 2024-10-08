import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {LandscapeComponent} from './landscape.component';

describe('LandscapeComponent', () => {
  let component: LandscapeComponent;
  let fixture: ComponentFixture<LandscapeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AdminTeamsComponent} from './admin-teams.component';

describe('AdminTeamsComponent', () => {
  let component: AdminTeamsComponent;
  let fixture: ComponentFixture<AdminTeamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

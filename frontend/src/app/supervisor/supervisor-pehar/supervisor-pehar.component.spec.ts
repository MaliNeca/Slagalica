import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorPeharComponent } from './supervisor-pehar.component';

describe('SupervisorPeharComponent', () => {
  let component: SupervisorPeharComponent;
  let fixture: ComponentFixture<SupervisorPeharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorPeharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorPeharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

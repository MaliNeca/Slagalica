import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorGeografijaComponent } from './supervisor-geografija.component';

describe('SupervisorGeografijaComponent', () => {
  let component: SupervisorGeografijaComponent;
  let fixture: ComponentFixture<SupervisorGeografijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorGeografijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorGeografijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

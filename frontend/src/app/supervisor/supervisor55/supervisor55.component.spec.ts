import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Supervisor55Component } from './supervisor55.component';

describe('Supervisor55Component', () => {
  let component: Supervisor55Component;
  let fixture: ComponentFixture<Supervisor55Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Supervisor55Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Supervisor55Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

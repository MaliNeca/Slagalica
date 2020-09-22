import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeografijaGameComponent } from './geografija-game.component';

describe('GeografijaGameComponent', () => {
  let component: GeografijaGameComponent;
  let fixture: ComponentFixture<GeografijaGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeografijaGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeografijaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

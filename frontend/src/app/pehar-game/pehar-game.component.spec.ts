import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeharGameComponent } from './pehar-game.component';

describe('PeharGameComponent', () => {
  let component: PeharGameComponent;
  let fixture: ComponentFixture<PeharGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeharGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeharGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

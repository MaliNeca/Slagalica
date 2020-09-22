import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetGameComponent } from './pet-game.component';

describe('PetGameComponent', () => {
  let component: PetGameComponent;
  let fixture: ComponentFixture<PetGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

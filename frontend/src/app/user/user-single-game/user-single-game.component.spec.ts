import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleGameComponent } from './user-single-game.component';

describe('UserSingleGameComponent', () => {
  let component: UserSingleGameComponent;
  let fixture: ComponentFixture<UserSingleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSingleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

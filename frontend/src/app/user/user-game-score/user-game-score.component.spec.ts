import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameScoreComponent } from './user-game-score.component';

describe('UserGameScoreComponent', () => {
  let component: UserGameScoreComponent;
  let fixture: ComponentFixture<UserGameScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGameScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

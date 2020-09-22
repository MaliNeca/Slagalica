import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordQuestionComponent } from './reset-password-question.component';

describe('ResetPasswordQuestionComponent', () => {
  let component: ResetPasswordQuestionComponent;
  let fixture: ComponentFixture<ResetPasswordQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

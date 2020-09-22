import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleGameComponent } from './admin-single-game.component';

describe('AdminSingleGameComponent', () => {
  let component: AdminSingleGameComponent;
  let fixture: ComponentFixture<AdminSingleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSingleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

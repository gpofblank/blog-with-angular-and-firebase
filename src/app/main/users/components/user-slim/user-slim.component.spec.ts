import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSlimComponent } from './user-slim.component';

describe('UserSlimComponent', () => {
  let component: UserSlimComponent;
  let fixture: ComponentFixture<UserSlimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSlimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

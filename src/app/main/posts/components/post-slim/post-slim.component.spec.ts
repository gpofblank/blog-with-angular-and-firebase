import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSlimComponent } from './post-slim.component';

describe('PostSlimComponent', () => {
  let component: PostSlimComponent;
  let fixture: ComponentFixture<PostSlimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSlimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

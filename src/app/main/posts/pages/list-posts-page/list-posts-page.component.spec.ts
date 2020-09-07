import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostsPageComponent } from './list-posts-page.component';

describe('ListPostsComponent', () => {
  let component: ListPostsPageComponent;
  let fixture: ComponentFixture<ListPostsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPostsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

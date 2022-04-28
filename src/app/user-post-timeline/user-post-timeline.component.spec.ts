import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostTimelineComponent } from './user-post-timeline.component';

describe('UserPostTimelineComponent', () => {
  let component: UserPostTimelineComponent;
  let fixture: ComponentFixture<UserPostTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

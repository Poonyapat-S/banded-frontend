import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionTimelineComponent } from './reaction-timeline.component';

describe('ReactionTimelineComponent', () => {
  let component: ReactionTimelineComponent;
  let fixture: ComponentFixture<ReactionTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import FeedbackProcessComponent from './feedback-process.component';

describe('FeedbackProcessComponent', () => {
  let component: FeedbackProcessComponent;
  let fixture: ComponentFixture<FeedbackProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import AdditionalMetricsComponent from './additional-metrics.component';

describe('AdditionalMetricsComponent', () => {
  let component: AdditionalMetricsComponent;
  let fixture: ComponentFixture<AdditionalMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalMetricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

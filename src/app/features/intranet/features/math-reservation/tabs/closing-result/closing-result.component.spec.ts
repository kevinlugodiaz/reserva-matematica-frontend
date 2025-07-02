import { ComponentFixture, TestBed } from '@angular/core/testing';

import ClosingResultComponent from './closing-result.component';

describe('ClosingResultComponent', () => {
  let component: ClosingResultComponent;
  let fixture: ComponentFixture<ClosingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosingResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

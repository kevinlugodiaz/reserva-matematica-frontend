import { ComponentFixture, TestBed } from '@angular/core/testing';

import MathReservationComponent from './math-reservation.component';

describe('MathReservationComponent', () => {
  let component: MathReservationComponent;
  let fixture: ComponentFixture<MathReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

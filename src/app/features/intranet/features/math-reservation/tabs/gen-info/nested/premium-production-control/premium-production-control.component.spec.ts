import { ComponentFixture, TestBed } from '@angular/core/testing';

import PremiumProductionControlComponent from './premium-production-control.component';

describe('PremiumProductionControlComponent', () => {
  let component: PremiumProductionControlComponent;
  let fixture: ComponentFixture<PremiumProductionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumProductionControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumProductionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

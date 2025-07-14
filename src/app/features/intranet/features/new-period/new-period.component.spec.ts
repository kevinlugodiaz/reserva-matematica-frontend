import { ComponentFixture, TestBed } from '@angular/core/testing';

import NewPeriodComponent from './new-period.component';

describe('NewPeriodComponent', () => {
  let component: NewPeriodComponent;
  let fixture: ComponentFixture<NewPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

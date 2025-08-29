import { ComponentFixture, TestBed } from '@angular/core/testing';

import LockValidationsComponent from './lock-validations.component';

describe('LockValidationsComponent', () => {
  let component: LockValidationsComponent;
  let fixture: ComponentFixture<LockValidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockValidationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import ReportedExceptionsComponent from './reported-exceptions.component';

describe('ReportedExceptionsComponent', () => {
  let component: ReportedExceptionsComponent;
  let fixture: ComponentFixture<ReportedExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedExceptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

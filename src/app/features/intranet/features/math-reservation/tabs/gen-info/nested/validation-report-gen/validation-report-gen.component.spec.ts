import { ComponentFixture, TestBed } from '@angular/core/testing';

import ValidationReportGenComponent from './validation-report-gen.component';

describe('ValidationReportGenComponent', () => {
  let component: ValidationReportGenComponent;
  let fixture: ComponentFixture<ValidationReportGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationReportGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationReportGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

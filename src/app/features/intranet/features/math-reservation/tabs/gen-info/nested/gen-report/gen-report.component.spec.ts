import { ComponentFixture, TestBed } from '@angular/core/testing';

import GenReportComponent from './gen-report.component';

describe('GenReportComponent', () => {
  let component: GenReportComponent;
  let fixture: ComponentFixture<GenReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import ReportGenComponent from 'src/app/features/intranet/features/math-reservation/tabs/gen-info/nested/report-gen/report-gen.component';

describe('ReportGenComponent', () => {
  let component: ReportGenComponent;
  let fixture: ComponentFixture<ReportGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

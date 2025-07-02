import { ComponentFixture, TestBed } from '@angular/core/testing';

import ClosingReportsComponent from './closing-reports.component';

describe('ClosingReportsComponent', () => {
  let component: ClosingReportsComponent;
  let fixture: ComponentFixture<ClosingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosingReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import DataChangeControlComponent from './data-change-control.component';

describe('DataChangeControlComponent', () => {
  let component: DataChangeControlComponent;
  let fixture: ComponentFixture<DataChangeControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataChangeControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataChangeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

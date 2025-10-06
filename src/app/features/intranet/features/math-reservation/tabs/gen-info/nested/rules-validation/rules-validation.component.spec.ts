import { ComponentFixture, TestBed } from '@angular/core/testing';

import RulesValidationComponent from './rules-validation.component';

describe('RulesValidationComponent', () => {
  let component: RulesValidationComponent;
  let fixture: ComponentFixture<RulesValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import AccountingReconciliationComponent from './accounting-reconciliation.component';

describe('AccountingReconciliationComponent', () => {
  let component: AccountingReconciliationComponent;
  let fixture: ComponentFixture<AccountingReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingReconciliationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountingReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

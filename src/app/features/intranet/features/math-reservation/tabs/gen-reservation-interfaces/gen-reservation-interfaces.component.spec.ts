import { ComponentFixture, TestBed } from '@angular/core/testing';

import GenReservationInterfacesComponent from './gen-reservation-interfaces.component';

describe('GenReservationInterfacesComponent', () => {
  let component: GenReservationInterfacesComponent;
  let fixture: ComponentFixture<GenReservationInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenReservationInterfacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenReservationInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsInputComponent } from './flight-details-input.component';

describe('FlightDetailsInputComponent', () => {
  let component: FlightDetailsInputComponent;
  let fixture: ComponentFixture<FlightDetailsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetailsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDetailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

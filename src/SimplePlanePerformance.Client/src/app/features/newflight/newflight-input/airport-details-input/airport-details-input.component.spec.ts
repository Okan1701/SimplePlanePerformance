import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportDetailsInputComponent } from './airport-details-input.component';

describe('AirportDetailsInputComponent', () => {
  let component: AirportDetailsInputComponent;
  let fixture: ComponentFixture<AirportDetailsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportDetailsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportDetailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

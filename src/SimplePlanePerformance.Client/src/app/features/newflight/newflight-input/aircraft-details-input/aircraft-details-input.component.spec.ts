import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftDetailsInputComponent } from './aircraft-details-input.component';

describe('AircraftDetailsInputComponent', () => {
  let component: AircraftDetailsInputComponent;
  let fixture: ComponentFixture<AircraftDetailsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftDetailsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftDetailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

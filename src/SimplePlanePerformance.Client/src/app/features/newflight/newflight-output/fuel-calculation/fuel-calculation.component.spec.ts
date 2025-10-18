import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCalculationComponent } from './fuel-calculation.component';

describe('FuelCalculationComponent', () => {
  let component: FuelCalculationComponent;
  let fixture: ComponentFixture<FuelCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

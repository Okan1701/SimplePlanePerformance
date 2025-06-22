import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeoffPerformanceComponent } from './takeoff-performance.component';

describe('TakeoffPerformanceComponent', () => {
  let component: TakeoffPerformanceComponent;
  let fixture: ComponentFixture<TakeoffPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeoffPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeoffPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

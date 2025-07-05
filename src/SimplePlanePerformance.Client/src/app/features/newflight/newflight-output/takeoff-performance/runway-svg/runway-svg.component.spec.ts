import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunwaySvgComponent } from './runway-svg.component';

describe('RunwaySvgComponent', () => {
  let component: RunwaySvgComponent;
  let fixture: ComponentFixture<RunwaySvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunwaySvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunwaySvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflightComponent } from './newflight.component';

describe('NewflightComponent', () => {
  let component: NewflightComponent;
  let fixture: ComponentFixture<NewflightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

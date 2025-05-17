import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflightInputComponent } from './newflight-input.component';

describe('NewflightInputComponent', () => {
  let component: NewflightInputComponent;
  let fixture: ComponentFixture<NewflightInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflightInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewflightInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

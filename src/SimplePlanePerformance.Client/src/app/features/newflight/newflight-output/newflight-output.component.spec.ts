import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflightOutputComponent } from './newflight-output.component';

describe('NewflightOutputComponent', () => {
  let component: NewflightOutputComponent;
  let fixture: ComponentFixture<NewflightOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflightOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewflightOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAircraftDialogComponent } from './add-aircraft-dialog.component';

describe('AddAircraftDialogComponent', () => {
  let component: AddAircraftDialogComponent;
  let fixture: ComponentFixture<AddAircraftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAircraftDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAircraftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

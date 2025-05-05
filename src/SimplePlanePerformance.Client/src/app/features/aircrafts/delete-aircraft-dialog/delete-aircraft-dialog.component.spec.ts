import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAircraftDialogComponent } from './delete-aircraft-dialog.component';

describe('DeleteAircraftDialogComponent', () => {
  let component: DeleteAircraftDialogComponent;
  let fixture: ComponentFixture<DeleteAircraftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAircraftDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAircraftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

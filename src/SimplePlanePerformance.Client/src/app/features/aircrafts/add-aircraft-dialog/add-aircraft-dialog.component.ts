import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AircraftType} from '../../../shared/enums/aircraft-type.enum';
import {FuelType} from '../../../shared/enums/fuel-type.enum';
import {Status} from '../../../shared/enums/status.enum';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AircraftsService} from '../aircrafts.service';
import {CreateAircraft} from '../../../shared/models/create-aircraft.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-aircraft-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './add-aircraft-dialog.component.html',
  styleUrl: './add-aircraft-dialog.component.scss'
})
export class AddAircraftDialogComponent {
  protected form;
  protected readonly AircraftType = AircraftType;
  protected readonly FuelType = FuelType;
  protected submitStatus = Status.None;
  protected readonly Status = Status;

  constructor(formBuilder: FormBuilder, private aircraftService: AircraftsService, private matSnackBar: MatSnackBar, private matDialogRef: MatDialogRef<AddAircraftDialogComponent>) {
    this.form = formBuilder.group({
      registration: ["", Validators.required],
      model: ["", Validators.required],
      type: [AircraftType.None, Validators.required],
      fuelType: [FuelType.None, Validators.required],
      maxLandingCrossWind: [null],
      maxLandingTailWind: [null],
      maxTakeoffCrossWind: [null],
      maxTakeoffTailWind: [null]
    });
  }

  protected submitForm(): void {
    if (this.form.invalid) return;

    this.submitStatus = Status.Loading;
    this.form.disable();

    let aircraft: CreateAircraft = {
      registration: this.form.value.registration ?? "",
      model: this.form.value.model ?? "",
      type: this.form.value.type ?? AircraftType.None,
      fuelType: this.form.value.fuelType ?? FuelType.None,
      maxLandingCrossWind: this.form.value.maxLandingCrossWind ?? undefined,
      maxLandingTailWind: this.form.value.maxLandingTailWind ?? undefined,
      maxTakeoffTailWind: this.form.value.maxTakeoffTailWind ?? undefined,
      maxTakeoffCrossWind: this.form.value.maxTakeoffCrossWind ?? undefined
    }

    this.aircraftService
      .addAircraft(aircraft)
      .subscribe({
        next: () => this.matDialogRef.close(),
        error: (error: HttpErrorResponse) => {
          console.error("Failed to add aircraft", error);
          this.matSnackBar.open("Failed to add aircraft");
          this.submitStatus = Status.None;
          this.form.enable();
        }
      })
  }
}

import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AircraftType } from '../../../shared/enums/aircraft-type.enum';
import { FuelType } from '../../../shared/enums/fuel-type.enum';
import { Status } from '../../../shared/enums/status.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  constructor(formBuilder: FormBuilder) {
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
  }

  protected readonly Status = Status;
}

import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AircraftType } from '../../../shared/enums/aircraft-type.enum';
import { FuelType } from '../../../shared/enums/fuel-type.enum';
import { Status } from '../../../shared/enums/status.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AircraftsService } from '../../../shared/services/aircrafts.service';
import { CreateAircraft } from '../../../shared/models/create-aircraft.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Aircraft } from '../../../shared/models/aircraft.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-add-aircraft-dialog',
	imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule, MatTooltipModule],
	templateUrl: './add-aircraft-dialog.component.html',
	styleUrl: './add-aircraft-dialog.component.scss'
})
export class AddAircraftDialogComponent {
	protected form;
	protected readonly AircraftType = AircraftType;
	protected readonly FuelType = FuelType;
	protected submitStatus = Status.None;
	protected readonly Status = Status;

	protected get isEditMode(): boolean {
		return this.aircraft != null;
	}

	constructor(formBuilder: FormBuilder, private aircraftService: AircraftsService, private matSnackBar: MatSnackBar, private matDialogRef: MatDialogRef<AddAircraftDialogComponent>, @Inject(MAT_DIALOG_DATA) public aircraft?: Aircraft) {
		this.form = formBuilder.group({
			registration: [this.aircraft?.registration ?? "", Validators.required],
			model: [this.aircraft?.model ?? "", Validators.required],
			type: [this.aircraft?.type ?? AircraftType.None, Validators.required],
			fuelType: [this.aircraft?.fuelType ?? FuelType.None, Validators.required],
			maxLandingCrossWind: [this.aircraft?.maxLandingCrossWind ?? null],
			maxLandingTailWind: [this.aircraft?.maxLandingTailWind ?? null],
			maxTakeoffCrossWind: [this.aircraft?.maxTakeoffCrossWind ?? null],
			maxTakeoffTailWind: [this.aircraft?.maxTakeoffTailWind ?? null],
			cruiseFuelLitersPerHour: [this.aircraft?.cruiseFuelLitersPerHour ?? null]
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
			maxTakeoffCrossWind: this.form.value.maxTakeoffCrossWind ?? undefined,
			cruiseFuelLitersPerHour: this.form.value.cruiseFuelLitersPerHour ?? 0
		}

		let operation = this.isEditMode ?
			this.aircraftService.updateAircraft(this.aircraft?.id ?? 0, aircraft) :
			this.aircraftService.addAircraft(aircraft);


		operation.subscribe({
			next: () => this.matDialogRef.close(),
			error: (error: HttpErrorResponse) => {
				let message = `Failed to ${this.isEditMode ? "update" : "add"} aircraft`
				console.error(message, error);
				this.matSnackBar.open(message);
				this.submitStatus = Status.None;
				this.form.enable();
			}
		})
	}
}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CardInputTitleComponent } from '../card-input-title/card-input-title.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-flight-details-input',
	imports: [CommonModule, MatButtonModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, CardInputTitleComponent, ReactiveFormsModule],
	templateUrl: './flight-details-input.component.html',
	styleUrl: './flight-details-input.component.scss'
})
export class FlightDetailsInputComponent {
	protected form: FormGroup<{
		departureAirport: FormControl<string | null>,
		arrivalAirport: FormControl<string | null>,
		alternateAirport: FormControl<string | null>,
		dateOfFlight: FormControl<Date | null>
	}>;

	constructor(formBuilder: FormBuilder) {
		this.form = formBuilder.group({
			departureAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			arrivalAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			alternateAirport: new FormControl('', [Validators.minLength(4)]),
			dateOfFlight: new FormControl<Date>(new Date(), [Validators.required]),
		})
	}

	protected get isValidForm$(): Observable<boolean> {
		return this.form.valueChanges.pipe(
			startWith(true),
			map(() => this.form.valid)
		)
	}

	protected swapDepartureDestination($event: MouseEvent): void {
		$event.stopImmediatePropagation();
		let departure = this.form.controls.departureAirport.value ?? "";
		let destination = this.form.controls.arrivalAirport.value ?? "";
		this.form.patchValue({
			departureAirport: destination,
			arrivalAirport: departure
		})
	}
}

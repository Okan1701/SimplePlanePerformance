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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewFlightService } from '../../newflight.service';

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

	constructor(formBuilder: FormBuilder, private newFlightService: NewFlightService) {
		this.form = formBuilder.group({
			departureAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			arrivalAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			alternateAirport: new FormControl('', [Validators.minLength(4)]),
			dateOfFlight: new FormControl<Date>(new Date(), [Validators.required]),
		});

		this.form.controls.departureAirport.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(x => {
				if (this.form.controls.departureAirport.valid) {
					this.newFlightService.departureIcao = x ?? '';
				} else {
					this.newFlightService.destinationIcao = '';
				}
			});

		this.form.controls.arrivalAirport.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(x => {
				if (this.form.controls.arrivalAirport.valid) {
					this.newFlightService.destinationIcao = x ?? '';
				} else {
					this.newFlightService.destinationIcao = '';
				}
			});
	}

	protected get isValidForm$(): Observable<boolean> {
		return this.form.valueChanges.pipe(
			startWith(true),
			map(() => this.form.valid)
		);
	}

	protected swapDepartureDestination($event: MouseEvent): void {
		$event.stopImmediatePropagation();
		let departure = this.form.controls.departureAirport.value ?? "";
		let destination = this.form.controls.arrivalAirport.value ?? "";
		this.form.patchValue({
			departureAirport: destination,
			arrivalAirport: departure
		});
	}
}

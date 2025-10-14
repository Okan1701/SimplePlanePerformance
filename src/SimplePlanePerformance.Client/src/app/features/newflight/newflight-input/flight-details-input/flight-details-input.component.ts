import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule, ValidationErrors,
	ValidatorFn,
	Validators
} from '@angular/forms';
import {filter, map, Observable, startWith} from 'rxjs';
import {CardInputTitleComponent} from '../card-input-title/card-input-title.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NewFlightService} from '../../services/newflight.service';
import {FlightDetails} from '../../models/flight-details.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Duration} from './duration.model';

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
		dateOfFlight: FormControl<Date | null>,
		flightDuration: FormControl<string | null>,
		alternateFlightDuration: FormControl<string | null>,
	}>;
	private readonly formStorageKey = "flightDetailsForm";

	constructor(formBuilder: FormBuilder, private newFlightService: NewFlightService, private matSnackBar: MatSnackBar) {
		this.form = formBuilder.group({
			departureAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			arrivalAirport: new FormControl('', [Validators.required, Validators.minLength(4)]),
			alternateAirport: new FormControl('', [Validators.minLength(4)]),
			dateOfFlight: new FormControl<Date>(new Date(), [Validators.required]),
			flightDuration: new FormControl<string>('', [Validators.required, Validators.minLength(5), this.durationValidator()]),
			alternateFlightDuration: new FormControl<string>('', [Validators.required, Validators.minLength(5), this.durationValidator()])
		});

		this.form.valueChanges.pipe(
			takeUntilDestroyed(),
			map(() => this.form.valid),
			filter(x => x),
			map(() => ({
				departureIcao: this.form.value.departureAirport,
				destinationIcaso: this.form.value.arrivalAirport,
				alternateIcao: this.form.value.alternateAirport,
				dateOfFlight: this.form.value.dateOfFlight,
                flightDurationHours: this.parseDuration(this.form.value.flightDuration).hours,
                flightDurationMinutes: this.parseDuration(this.form.value.flightDuration).minutes,
                alternateFlightDurationHours: this.parseDuration(this.form.value.alternateFlightDuration).hours,
                alternateFlightDurationMinutes: this.parseDuration(this.form.value.alternateFlightDuration).minutes,
                
			}) as FlightDetails)
		).subscribe(x => newFlightService.flightDetails = x);

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

	protected saveForm(): void {
		if (this.form.valid) {
			window.localStorage.setItem(this.formStorageKey, JSON.stringify(this.form.value));
			this.matSnackBar.open("Flight details saved.", undefined, {
				duration: 3000,
			});
		} else {
			this.matSnackBar.open("Cannot save invalid form.", undefined, {
				duration: 3000,
			});
		}
	}

	protected resetForm(): void {
		this.form.reset();
		this.matSnackBar.open("Flight details reset.", undefined, {
			duration: 3000,
		});
	}

	protected loadFormHistory(): void {
		let rawData = window.localStorage.getItem(this.formStorageKey);
		if (rawData == null) {
			this.matSnackBar.open("No previous flight data found.", undefined, {
				duration: 3000,
			});
			return;
		}

		this.form.patchValue(JSON.parse(rawData));
		this.matSnackBar.open("Previous data loaded.", undefined, {
			duration: 3000,
		});
	}

	private parseDuration(duration: string | null | undefined): Duration {
        if (!duration) {
            throw new Error("Duration cannot be null");
        }
        
		let split = duration.split(":");
		if (split.length !== 2) {
			throw new Error("Invalid duration: " + duration);
		}

		let hours = parseInt(split[0]);
		let minutes = parseInt(split[1]);

		if (isNaN(hours) || isNaN(minutes)) {
			throw new Error("Invalid duration: " + duration);
		}

		return {
			hours,
			minutes,
		};
	}

	private durationValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			let value = control.value as string;
			let isValid = true;
			try {
				this.parseDuration(value);
			} catch (error) {
				isValid = false;
			}

			return isValid ? null : { invalidDuration: true };
		}
	}
}

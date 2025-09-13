import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardInputTitleComponent } from '../card-input-title/card-input-title.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MetarService } from '../../../../shared/services/metar.service';
import { NewFlightService } from '../../services/newflight.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Metar } from '../../../../shared/models/metar.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-airport-details-input',
	imports: [MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule, CardInputTitleComponent, ReactiveFormsModule],
	templateUrl: './airport-details-input.component.html',
	styleUrl: './airport-details-input.component.scss'
})
export class AirportDetailsInputComponent {
	protected departureMetar?: Metar;
	protected destinationMetar?: Metar;
	protected isFetchingDepartureWind = false;
	protected isFetchingDestinationWind = false;
	protected form: FormGroup<{
		departureTora: FormControl<number | null>,
		departureToda: FormControl<number | null>,
		departureAsda: FormControl<number | null>
		departureLda: FormControl<number | null>,
		departureWind: FormControl<string | null>,
		departureRwyHdg: FormControl<number | null>,
		destinationTora: FormControl<number | null>,
		destinationToda: FormControl<number | null>,
		destinationAsda: FormControl<number | null>
		destinationLda: FormControl<number | null>,
		destinationWind: FormControl<string | null>,
		destinationRwyHdg: FormControl<number | null>,
	}>;
	private readonly formStorageKey = "airportDetailsForm";

	constructor(formBuilder: FormBuilder, private matSnackBar: MatSnackBar, private metarService: MetarService, private newFlightService: NewFlightService) {
		this.form = formBuilder.group({
			departureTora: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureToda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureAsda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureLda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureWind: new FormControl('', [Validators.required]),
			departureRwyHdg: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(359)]),
			destinationTora: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationToda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationAsda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationLda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationWind: new FormControl('', [Validators.required]),
			destinationRwyHdg: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(359)]),
		});

		this.form.valueChanges.pipe(
			takeUntilDestroyed(),
		).subscribe(formValue => {
			if (this.form.valid) {
				let departureWindComponents = formValue.departureWind?.split("/") ?? [];
				if (departureWindComponents != null && departureWindComponents.length < 2) {
					throw new Error("Invalid destination wind value despite form being valid!");
				}

				let destinationWindComponents = formValue.destinationWind?.split("/") ?? [];
				if (destinationWindComponents != null && destinationWindComponents.length < 2) {
					throw new Error("Invalid destination wind value despite form being valid!");
				}

				newFlightService.airportDetails = {
					departureTora: formValue.departureTora as number,
					departureToda: formValue.departureToda as number,
					departureAsda: formValue.departureAsda as number,
					departureLda: formValue.departureLda as number,
					departureWindDirection: parseInt(departureWindComponents[0].trim() ?? "0"),
					departureWindSpeed: parseInt(departureWindComponents[1].trim() ?? "0"),
					departureRwyHdg: formValue.departureRwyHdg as number,
					destinationTora: formValue.destinationTora as number,
					destinationToda: formValue.destinationToda as number,
					destinationAsda: formValue.destinationAsda as number,
					destinationLda: formValue.destinationLda as number,
					destinationWindDirection: parseInt(destinationWindComponents[0].trim() ?? "0"),
					destinationWindSpeed: parseInt(destinationWindComponents[1].trim() ?? "0"),
					destinationRwyHdg: formValue.destinationRwyHdg as number,
				}
			} else {
				newFlightService.airportDetails = null;
			}
		});
	}

	protected fetchDepartureWind(): void {
		let station = this.newFlightService.departureIcao;

		if (!station) {
			this.matSnackBar.open("Departure ICAO is invalid!", undefined, {
				duration: 3000
			});
			return;
		}

		this.isFetchingDepartureWind = true;
		this.metarService.getMetarForStation(station).subscribe({
			next: (metar: Metar) => {
				this.form.controls.departureWind.setValue(`${metar.windDirection} / ${metar.windSpeedKnots}`);
				this.matSnackBar.open("Departure weather applied.", undefined, {
					duration: 3000
				});
				this.isFetchingDepartureWind = false;
				this.departureMetar = metar;
			},
			error: err => {
				console.error("Failed to retrieve metar.", err);
				this.matSnackBar.open("Something went wrong when retrieving weather!", undefined, {
					duration: 3000
				});
				this.isFetchingDepartureWind = false
			}
		});
	}

	protected fetchDestinationWind(): void {
		let station = this.newFlightService.destinationIcao;

		if (!station) {
			this.matSnackBar.open("Destination ICAO is invalid!", undefined, {
				duration: 3000
			});
			return;
		}

		this.isFetchingDestinationWind = true;
		this.metarService.getMetarForStation(station).subscribe({
			next: (metar: Metar) => {
				this.form.controls.destinationWind.setValue(`${metar.windDirection} / ${metar.windSpeedKnots}`);
				this.matSnackBar.open("Destination weather applied.", undefined, {
					duration: 3000
				});
				this.isFetchingDestinationWind = false
				this.destinationMetar = metar;
			},
			error: err => {
				console.error("Failed to retrieve metar.", err);
				this.matSnackBar.open("Something went wrong when retrieving weather!", undefined, {
					duration: 3000
				});
				this.isFetchingDestinationWind = false
			}
		});
	}

	protected saveForm(): void {
		if (this.form.valid) {
			window.localStorage.setItem(this.formStorageKey, JSON.stringify(this.form.value));
			this.matSnackBar.open("Airport details saved.", undefined, {
				duration: 3000,
			});
		}
		else {
			this.matSnackBar.open("Cannot save invalid form.", undefined, {
				duration: 3000,
			});
		}
	}

	protected resetForm(): void {
		this.form.reset();
		this.matSnackBar.open("Airport details reset.", undefined, {
			duration: 3000,
		});
	}

	protected loadFormHistory(): void {
		let rawData = window.localStorage.getItem(this.formStorageKey);
		if (rawData == null) {
			this.matSnackBar.open("No previous airport data found.", undefined, {
				duration: 3000,
			});
			return;
		}

		this.form.patchValue(JSON.parse(rawData));
		this.matSnackBar.open("Previous data loaded.", undefined, {
			duration: 3000,
		});
	}
}

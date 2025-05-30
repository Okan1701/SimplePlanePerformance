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
import { NewFlightService } from '../../newflight.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Metar } from '../../../../shared/models/metar.model';

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
		destinationTora: FormControl<number | null>,
		destinationToda: FormControl<number | null>,
		destinationAsda: FormControl<number | null>
		destinationLda: FormControl<number | null>,
		destinationWind: FormControl<string | null>
	}>

	constructor(formBuilder: FormBuilder, private matSnackBar: MatSnackBar, private metarService: MetarService, private newFlightService: NewFlightService) {
		this.form = formBuilder.group({
			departureTora: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureToda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureAsda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureLda: new FormControl(0, [Validators.required, Validators.min(100)]),
			departureWind: new FormControl('', [Validators.required]),
			destinationTora: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationToda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationAsda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationLda: new FormControl(0, [Validators.required, Validators.min(100)]),
			destinationWind: new FormControl('', [Validators.required]),
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
}

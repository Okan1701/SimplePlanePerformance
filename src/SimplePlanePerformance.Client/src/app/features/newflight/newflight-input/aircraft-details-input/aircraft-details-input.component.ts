import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AircraftsService } from '../../../../shared/services/aircrafts.service';
import { combineLatestWith, filter, map, Observable, startWith, takeLast, tap } from 'rxjs';
import { Status } from '../../../../shared/enums/status.enum';
import { CommonModule } from '@angular/common';
import { Aircraft } from '../../../../shared/models/aircraft.model';
import { CardInputTitleComponent } from '../card-input-title/card-input-title.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormatAircraftTypePipe} from '../../../../shared/pipes/format-aircraft-type.pipe';
import {FormatFuelTypePipe} from '../../../../shared/pipes/format-fuel-type.pipe';
import { MatButtonModule } from '@angular/material/button';
import { NewFlightService } from '../../services/newflight.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-aircraft-details-input',
	imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatProgressBarModule, CardInputTitleComponent, ReactiveFormsModule, MatTooltipModule, FormatAircraftTypePipe, FormatFuelTypePipe],
	templateUrl: './aircraft-details-input.component.html',
	styleUrl: './aircraft-details-input.component.scss'
})
export class AircraftDetailsInputComponent implements OnInit {
	protected selectedAircraft?: Aircraft;
	protected form: FormGroup<{
		aircraftId: FormControl<number | null>,
		registration: FormControl<string | null>,
		takeoffLiftoff: FormControl<number | null>,
		takeoff50ftHeight: FormControl<number | null>,
		landingGroundTouch: FormControl<number | null>,
		landing50ftHeight: FormControl<number | null>,
	}>;
	private readonly formStorageKey = "aircraftDetailsForm";

	constructor(formBuilder: FormBuilder, private aircraftService: AircraftsService, newFlightService: NewFlightService, private matSnackBar: MatSnackBar) {
		this.form = formBuilder.group({
			aircraftId: new FormControl(0, [Validators.required]),
			registration: new FormControl('', [Validators.required]),
			takeoffLiftoff: new FormControl(0, [Validators.required, Validators.min(100)]),
			takeoff50ftHeight: new FormControl(0, [Validators.required, Validators.min(100)]),
			landingGroundTouch: new FormControl(0, [Validators.required, Validators.min(100)]),
			landing50ftHeight: new FormControl(0, [Validators.required, Validators.min(100)])
		});

		this.form.valueChanges.pipe(
			combineLatestWith(this.aircraftService.aircrafts$),
			takeUntilDestroyed()
		).subscribe(([form, aircraft]) => {
			if (aircraft.length === 0 || !form.aircraftId) {
				newFlightService.aircraftDetails = null;
			}

			let selectedAircraft = aircraft.find(x => x.id === form.aircraftId);
			if (!selectedAircraft) {
				throw new Error("Chosen aircraft does not exist");
			}

			if (this.form.valid) {
				newFlightService.aircraftDetails = {
					aircraft: selectedAircraft,
					registration: form.registration ?? "",
					takeOffLifeoff: form.takeoffLiftoff ?? 0,
					takeoffTo50ftHeight: form.takeoff50ftHeight ?? 0,
					landingGroundTouch: form.landingGroundTouch ?? 0,
					landingFrom50ftHeight: form.landing50ftHeight ?? 0
				};
			} else {
				newFlightService.aircraftDetails = null
			}
		})

		this.form.controls.aircraftId.valueChanges
			.pipe(
				takeUntilDestroyed(),
				combineLatestWith(this.aircraftService.aircrafts$)
			).subscribe(([id, aircraft]) => {
				if (id != null && aircraft?.length > 0) {
					this.selectedAircraft = aircraft.find(x => x.id === id);
					this.form.controls.registration.setValue(this.selectedAircraft?.registration ?? "");
				}
				else {
					this.selectedAircraft = undefined;
				}
		})
	}

	public ngOnInit() {
		this.aircraftService.loadAircrafts();
	}

	protected get isLoading$(): Observable<boolean> {
		return this.aircraftService.status$.pipe(
			map(status => status !== Status.Success && status !== Status.Error),
		);
	}

	protected get isLoadingFailed$(): Observable<boolean> {
		return this.aircraftService.status$.pipe(
			map(status => status === Status.Error)
		);
	}

	protected get aircraft$(): Observable<Aircraft[]> {
		return this.aircraftService.aircrafts$.pipe(
			startWith([]),
			filter(aircraft => aircraft != null)
		);
	}

	protected onRefreshClick(event: MouseEvent): void {
		event.stopImmediatePropagation();
		this.aircraftService.loadAircrafts(true);
	}

	protected saveForm(): void {
		if (this.form.valid) {
			window.localStorage.setItem(this.formStorageKey, JSON.stringify(this.form.value));
			this.matSnackBar.open("Aircraft details saved.", undefined, {
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
		this.matSnackBar.open("Aircraft details reset.", undefined, {
			duration: 3000,
		});
	}

	protected loadFormHistory(): void {
		let rawData = window.localStorage.getItem(this.formStorageKey);
		if (rawData == null) {
			this.matSnackBar.open("No previous data found.", undefined, {
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

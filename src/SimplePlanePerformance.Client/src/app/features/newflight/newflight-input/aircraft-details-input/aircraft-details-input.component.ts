import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AircraftsService } from '../../../../shared/services/aircrafts.service';
import {combineLatestWith, filter, map, Observable, startWith} from 'rxjs';
import { Status } from '../../../../shared/enums/status.enum';
import { CommonModule } from '@angular/common';
import { Aircraft } from '../../../../shared/models/aircraft.model';
import { CardInputTitleComponent } from '../card-input-title/card-input-title.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormatAircraftTypePipe} from '../../../../shared/pipes/format-aircraft-type.pipe';
import {FormatFuelTypePipe} from '../../../../shared/pipes/format-fuel-type.pipe';

@Component({
	selector: 'app-aircraft-details-input',
	imports: [CommonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatProgressBarModule, CardInputTitleComponent, ReactiveFormsModule, MatTooltipModule, FormatAircraftTypePipe, FormatFuelTypePipe],
	templateUrl: './aircraft-details-input.component.html',
	styleUrl: './aircraft-details-input.component.scss'
})
export class AircraftDetailsInputComponent implements OnInit {
	protected selectedAircraft?: Aircraft;
	protected form: FormGroup<{
		aircraftId: FormControl<number | null>,
		registration: FormControl<string | null>
	}>;

	constructor(formBuilder: FormBuilder, private aircraftService: AircraftsService) {
		this.form = formBuilder.group({
			aircraftId: new FormControl(0, [Validators.required]),
			registration: new FormControl('', [Validators.required])
		});

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
			map(status => status !== Status.Success)
		);
	}

	protected get aircraft$(): Observable<Aircraft[]> {
		return this.aircraftService.aircrafts$.pipe(
			startWith([]),
			filter(aircraft => aircraft != null)
		);
	}
}

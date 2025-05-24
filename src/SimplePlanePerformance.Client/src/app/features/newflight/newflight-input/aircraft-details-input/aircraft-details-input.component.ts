import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AircraftsService } from '../../../../shared/services/aircrafts.service';
import { filter, map, Observable, startWith } from 'rxjs';
import { Status } from '../../../../shared/enums/status.enum';
import { CommonModule } from '@angular/common';
import { Aircraft } from '../../../../shared/models/aircraft.model';
import { CardInputTitleComponent } from '../card-input-title/card-input-title.component';

@Component({
	selector: 'app-aircraft-details-input',
	imports: [CommonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatProgressBarModule, CardInputTitleComponent],
	templateUrl: './aircraft-details-input.component.html',
	styleUrl: './aircraft-details-input.component.scss'
})
export class AircraftDetailsInputComponent implements OnInit {
	constructor(private aircraftService: AircraftsService) {
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

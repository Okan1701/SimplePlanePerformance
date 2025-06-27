import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {Observable, switchMap} from 'rxjs';
import { CommonModule } from '@angular/common';
import { TakeoffPerformanceComponent } from './takeoff-performance/takeoff-performance.component';
import { NewFlightPerformanceService } from '../services/newflight-performance.service';
import { NewFLightPerformance } from '../models/newflight-performance.model';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NewFlight} from '../models/newflight.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NewFlightService} from '../services/newflight.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'app-newflight-output',
	imports: [MatIconModule, CommonModule, TakeoffPerformanceComponent, MatTooltipModule, MatCardModule, MatButtonModule],
	templateUrl: './newflight-output.component.html',
	styleUrl: './newflight-output.component.scss'
})
export class NewflightOutputComponent {
	private newFlightInput?: NewFlight;

	constructor(private matSnackBar: MatSnackBar, private newFlightPerformanceService: NewFlightPerformanceService, newFlightService: NewFlightService) {
		this.newFlightPerformanceService.newFlightPerformance$.pipe(
			takeUntilDestroyed(),
			switchMap(() => newFlightService.newFlight$)
		).subscribe(newFlight => this.newFlightInput = newFlight);
	}

	protected get newFlightPerformance$(): Observable<NewFLightPerformance | null> {
		return this.newFlightPerformanceService.newFlightPerformance$;
	}

	protected saveFlight(): void {
		if (this.newFlightInput) {
			window.localStorage.setItem("newFlight", JSON.stringify(this.newFlightInput));
			this.matSnackBar.open("Flight saved", undefined, {
				duration: 3000,
			})
		}
	}
}

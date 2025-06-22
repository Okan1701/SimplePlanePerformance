import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NewFlightService } from '../services/newflight.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TakeoffPerformanceComponent } from './takeoff-performance/takeoff-performance.component';
import { NewFlightPerformanceService } from '../services/newflight-performance.service';
import { NewFLightPerformance } from '../models/newflight-performance.model';

@Component({
	selector: 'app-newflight-output',
	imports: [MatIconModule, CommonModule, TakeoffPerformanceComponent],
	templateUrl: './newflight-output.component.html',
	styleUrl: './newflight-output.component.scss'
})
export class NewflightOutputComponent {
	constructor(private newFlightPerformanceService: NewFlightPerformanceService) {
	}

	protected get newFlightPerformance$(): Observable<NewFLightPerformance | null> {
		return this.newFlightPerformanceService.newFlightPerformance$;
	}
}

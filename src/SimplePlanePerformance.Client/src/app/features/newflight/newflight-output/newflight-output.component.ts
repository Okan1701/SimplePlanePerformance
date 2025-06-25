import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TakeoffPerformanceComponent } from './takeoff-performance/takeoff-performance.component';
import { NewFlightPerformanceService } from '../services/newflight-performance.service';
import { NewFLightPerformance } from '../models/newflight-performance.model';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-newflight-output',
	imports: [MatIconModule, CommonModule, TakeoffPerformanceComponent, MatTooltipModule, MatCardModule],
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

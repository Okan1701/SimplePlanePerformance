import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {TakeoffPerformance} from '../../models/takeoff-performance.model';
import {RunwaySvgComponent} from './runway-svg/runway-svg.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
	selector: 'app-takeoff-performance',
	imports: [CommonModule, MatCardModule, RunwaySvgComponent, MatTooltipModule],
	templateUrl: './takeoff-performance.component.html',
	styleUrl: './takeoff-performance.component.scss'
})
export class TakeoffPerformanceComponent {
	@Input()
	public takeoffPerformance?: TakeoffPerformance;
}

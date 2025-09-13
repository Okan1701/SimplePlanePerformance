import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {TakeoffPerformance} from '../../models/takeoff-performance.model';
import {RunwaySvgComponent} from './runway-svg/runway-svg.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardTextComponent} from '../../../../shared/components/clipboard-text/clipboard-text.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: 'app-takeoff-performance',
	imports: [CommonModule, MatCardModule, RunwaySvgComponent, MatTooltipModule, ClipboardTextComponent, MatIconModule],
	templateUrl: './takeoff-performance.component.html',
	styleUrl: './takeoff-performance.component.scss'
})
export class TakeoffPerformanceComponent {
	@Input()
	public takeoffPerformance?: TakeoffPerformance;

	protected get isHeadwind(): boolean {
		if (this.takeoffPerformance?.headWind) {
			return this.takeoffPerformance?.headWind > 0
		}

		return true;
	}

	protected get isCrosswindFromRight(): boolean {
		if (this.takeoffPerformance?.crossWind) {
			return this.takeoffPerformance?.headWind > 0
		}

		return true;
	}

	protected absolute(value?: number): number {
		if (value) {
			return Math.abs(value);
		}

		return 0;
	}
}

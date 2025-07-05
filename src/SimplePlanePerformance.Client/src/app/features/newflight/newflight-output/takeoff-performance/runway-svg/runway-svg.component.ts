import { Component, Input } from '@angular/core';
import { TakeoffPerformance } from '../../../models/takeoff-performance.model';
import { take } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-runway-svg',
  imports: [MatTooltipModule],
  templateUrl: './runway-svg.component.html',
  styleUrl: './runway-svg.component.scss'
})
export class RunwaySvgComponent {
	@Input()
	public takeoffPerformance?: TakeoffPerformance;

	protected get runwayToraLineWidth(): string {
		if (!this.takeoffPerformance) return "0";

		return `${this.takeoffPerformance.runwayToraUsedPercentage}%`
	}

	protected get runwayTodaLineWidth(): string {
		if (!this.takeoffPerformance) return "0";

		return `${this.takeoffPerformance.runwayTodaUsedPercentage}%`
	}

	protected readonly take = take;
}

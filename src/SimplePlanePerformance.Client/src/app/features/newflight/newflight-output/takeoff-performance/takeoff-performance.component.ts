import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TakeoffPerformance } from '../../takeoff-performance.model';

@Component({
  selector: 'app-takeoff-performance',
  imports: [CommonModule, MatCardModule],
  templateUrl: './takeoff-performance.component.html',
  styleUrl: './takeoff-performance.component.scss'
})
export class TakeoffPerformanceComponent {
	@Input()
	public takeoffPerformance?: TakeoffPerformance;
}

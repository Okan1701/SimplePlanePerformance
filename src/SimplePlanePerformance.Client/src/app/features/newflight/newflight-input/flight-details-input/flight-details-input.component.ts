import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
	selector: 'app-flight-details-input',
	imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule],
	templateUrl: './flight-details-input.component.html',
	styleUrl: './flight-details-input.component.scss'
})
export class FlightDetailsInputComponent {

}

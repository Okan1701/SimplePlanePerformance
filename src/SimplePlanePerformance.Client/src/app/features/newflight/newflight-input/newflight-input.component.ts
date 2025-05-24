import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlightDetailsInputComponent } from './flight-details-input/flight-details-input.component';
import { AircraftDetailsInputComponent } from './aircraft-details-input/aircraft-details-input.component';
import { AirportDetailsInputComponent } from './airport-details-input/airport-details-input.component';

@Component({
	selector: 'app-newflight-input',
	imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatButtonModule, FlightDetailsInputComponent, AircraftDetailsInputComponent, AirportDetailsInputComponent],
	templateUrl: './newflight-input.component.html',
	styleUrl: './newflight-input.component.scss'
})
export class NewflightInputComponent {

}

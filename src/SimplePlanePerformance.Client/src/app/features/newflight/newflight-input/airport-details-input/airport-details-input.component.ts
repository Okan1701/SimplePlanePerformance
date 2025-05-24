import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-airport-details-input',
	imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule],
	templateUrl: './airport-details-input.component.html',
	styleUrl: './airport-details-input.component.scss'
})
export class AirportDetailsInputComponent {

}

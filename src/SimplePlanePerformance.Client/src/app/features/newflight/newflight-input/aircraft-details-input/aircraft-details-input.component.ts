import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle } from "@angular/material/card";
import { MatInput, MatInputModule, MatLabel } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-aircraft-details-input',
	imports: [MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule, MatSelectModule],
	templateUrl: './aircraft-details-input.component.html',
	styleUrl: './aircraft-details-input.component.scss'
})
export class AircraftDetailsInputComponent {

}

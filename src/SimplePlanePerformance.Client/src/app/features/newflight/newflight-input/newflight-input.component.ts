import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-newflight-input',
	imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatButtonModule],
	templateUrl: './newflight-input.component.html',
	styleUrl: './newflight-input.component.scss'
})
export class NewflightInputComponent {

}

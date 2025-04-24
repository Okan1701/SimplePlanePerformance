import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-aircraft-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-aircraft-dialog.component.html',
  styleUrl: './add-aircraft-dialog.component.scss'
})
export class AddAircraftDialogComponent {

}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Aircraft} from '../../../shared/models/aircraft.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AircraftsService} from '../../../shared/services/aircrafts.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Status} from '../../../shared/enums/status.enum';

@Component({
	selector: 'app-delete-aircraft-dialog',
	imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
],
	templateUrl: './delete-aircraft-dialog.component.html',
	styleUrl: './delete-aircraft-dialog.component.scss'
})
export class DeleteAircraftDialogComponent {
	protected status = Status.None;
	protected readonly Status = Status;

	constructor(@Inject(MAT_DIALOG_DATA) public aircraft: Aircraft, private aircraftService: AircraftsService, private matDialogRef: MatDialogRef<DeleteAircraftDialogComponent>) {
	}

	protected deleteAircraft(): void {
		this.status = Status.Loading;
		this.aircraftService
			.deleteAircraft(this.aircraft)
			.subscribe({
				next: () => {
					this.matDialogRef.close();
				},
				error: (error: HttpErrorResponse) => {
					console.error("Failed to delete aircraft", error)
					this.status = Status.Error;
				}
			})
	}
}

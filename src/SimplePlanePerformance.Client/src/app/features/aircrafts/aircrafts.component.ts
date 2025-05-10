import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AircraftsService } from './aircrafts.service';
import { map, Observable } from 'rxjs';
import { Status } from '../../shared/enums/status.enum';
import { Aircraft } from '../../shared/models/aircraft.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddAircraftDialogComponent } from './add-aircraft-dialog/add-aircraft-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteAircraftDialogComponent } from './delete-aircraft-dialog/delete-aircraft-dialog.component';
import { FormatAircraftTypePipe } from '../../shared/pipes/format-aircraft-type.pipe';
import { FormatFuelTypePipe } from '../../shared/pipes/format-fuel-type.pipe';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
	selector: 'app-aircrafts',
	imports: [
		CommonModule,
		MatButtonModule,
		MatSortModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatTooltipModule,
		MatMenuModule,
		FormatAircraftTypePipe,
		FormatFuelTypePipe
	],
	templateUrl: './aircrafts.component.html',
	styleUrl: './aircrafts.component.scss'
})
export class AircraftsComponent implements OnInit {
	protected readonly tableData = new MatTableDataSource<Aircraft>();
	protected readonly tableColumns = [
		"registration",
		"model",
		"createdDate",
		"modifiedDate",
		"type",
		"fuelType",
		"actions"
	]

	constructor(private aircraftsService: AircraftsService, private dialog: MatDialog, loadingService: LoadingService) {
		this.aircraftsService.aircrafts$.pipe(
			takeUntilDestroyed()
		).subscribe(aircraft => this.tableData.data = aircraft);

		this.aircraftsService.status$.pipe(
			takeUntilDestroyed()
		).subscribe(status => loadingService.setLoadingStatus(status));
	}

	protected get status$(): Observable<Status> {
		return this.aircraftsService.status$;
	}

	protected get showNoDataFound$(): Observable<boolean> {
		return this.aircraftsService.aircrafts$.pipe(
			map(aircraft => aircraft === null || aircraft?.length === 0),
		);
	}

	public ngOnInit(): void {
		this.aircraftsService.loadAircrafts();
	}

	protected refresh(): void {
		this.aircraftsService.loadAircrafts(true)
	}

	protected openAddAircraftDialog(): void {
		this.dialog.open(AddAircraftDialogComponent, {
			disableClose: true
		})
	}

	protected deleteAircraft(aircraft: Aircraft): void {
		this.dialog.open(DeleteAircraftDialogComponent, {
			data: aircraft,
			disableClose: true,
			role: "alertdialog"
		});
	}

	protected editAircraft(aircraft: Aircraft): void {
		this.dialog.open(AddAircraftDialogComponent, {
			data: aircraft,
			disableClose: true,
		});
	}

	protected readonly Status = Status;
}

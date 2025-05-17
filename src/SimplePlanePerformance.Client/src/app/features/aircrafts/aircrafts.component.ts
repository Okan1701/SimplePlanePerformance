import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteAircraftDialogComponent } from './delete-aircraft-dialog/delete-aircraft-dialog.component';
import { FormatAircraftTypePipe } from '../../shared/pipes/format-aircraft-type.pipe';
import { FormatFuelTypePipe } from '../../shared/pipes/format-fuel-type.pipe';
import { LoadingService } from '../../shared/services/loading.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
		FormatFuelTypePipe,
		ReactiveFormsModule
	],
	templateUrl: './aircrafts.component.html',
	styleUrl: './aircrafts.component.scss'
})
export class AircraftsComponent implements OnInit, AfterViewInit {
	protected readonly tableData = new MatTableDataSource<Aircraft>();
	protected readonly tableColumns = [
		"registration",
		"model",
		"createdDate",
		"modifiedDate",
		"type",
		"fuelType",
		"actions"
	];
	protected filterForm;
	protected showClearButton = false;

	@ViewChild(MatSort)
	protected sort?: MatSort;

	constructor(private aircraftsService: AircraftsService, private dialog: MatDialog, private formBuilder: FormBuilder, loadingService: LoadingService) {
		this.aircraftsService.aircrafts$.pipe(
			takeUntilDestroyed()
		).subscribe(aircraft => this.tableData.data = aircraft);

		this.aircraftsService.status$.pipe(
			takeUntilDestroyed()
		).subscribe(status => loadingService.setLoadingStatus(status));

		this.filterForm = this.formBuilder.group({
			searchTerm: ["", []]
		});

		this.filterForm.controls.searchTerm.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(searchTerm => {
				this.tableData.filter = searchTerm ?? "";
				this.showClearButton = this.tableData.filter.length > 0;
			});
	}

	public ngAfterViewInit() {
		if (this.sort) {
			this.tableData.sort = this.sort;
		}
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
		this.filterForm.reset();
		this.showClearButton = false;
		this.aircraftsService.loadAircrafts(true);
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

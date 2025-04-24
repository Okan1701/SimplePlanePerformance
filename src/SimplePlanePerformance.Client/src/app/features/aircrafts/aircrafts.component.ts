import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {AircraftsService} from './aircrafts.service';
import {map, Observable, tap} from 'rxjs';
import {Status} from '../../shared/enums/status.enum';
import {Aircraft} from '../../shared/models/aircraft.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {StatusComponent} from '../../shared/components/status/status.component';
import {MatDialog} from '@angular/material/dialog';
import {AddAircraftDialogComponent} from './add-aircraft-dialog/add-aircraft-dialog.component';

@Component({
  selector: 'app-aircrafts',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, StatusComponent],
  templateUrl: './aircrafts.component.html',
  styleUrl: './aircrafts.component.scss'
})
export class AircraftsComponent implements OnInit {
  protected readonly tableData = new MatTableDataSource<Aircraft>();

  constructor(private aircraftsService: AircraftsService, private dialog: MatDialog) {
    this.aircraftsService.aircrafts$.pipe(
      takeUntilDestroyed()
    ).subscribe(aircrafts => this.tableData.data = aircrafts);
  }

  protected get status$(): Observable<Status> {
    return this.aircraftsService.status$;
  }

  protected get showNoDataFound$(): Observable<boolean> {
    return this.aircraftsService.aircrafts$.pipe(
      tap(aircraft => console.log(aircraft === null || aircraft?.length === 0)),
      map(aircraft => aircraft === null || aircraft?.length === 0),
    );
  }

  protected openAddAircraftDialog(): void {
    this.dialog.open(AddAircraftDialogComponent, {
      disableClose: true
    })
  }

  public ngOnInit(): void {
    this.aircraftsService.loadAircrafts();
  }
}

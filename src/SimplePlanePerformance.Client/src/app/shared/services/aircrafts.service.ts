import { BehaviorSubject, catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { Aircraft } from '../models/aircraft.model';
import { environment } from "../../../environments/environment"
import { Status } from '../enums/status.enum';
import { Injectable } from '@angular/core';
import { CreateAircraft } from '../models/create-aircraft.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

const endpoint = `${environment.apiUrl}/v1/aircraft`

@Injectable({providedIn: 'root'})
export class AircraftsService {
	private readonly aircraftsSubject = new BehaviorSubject<Aircraft[]>([]);
	private readonly statusSubject = new BehaviorSubject<Status>(Status.None);

	constructor(private readonly httpClient: HttpClient, private matSnackBar: MatSnackBar) {
	}

	public get status$(): Observable<Status> {
		return this.statusSubject.asObservable();
	}

	public get aircrafts$(): Observable<Aircraft[]> {
		return this.aircraftsSubject.asObservable();
	}

	public loadAircrafts(force: boolean = false): void {
		if (this.statusSubject.value === Status.Success && !force) return

		this.statusSubject.next(Status.Loading);
		this.httpClient.get<Aircraft[]>(endpoint)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					this.statusSubject.next(Status.Error)
					return throwError(() => err)
				}),
				delay(force ? 500 : 0),
				map((aircraft: Aircraft[]) => aircraft.map(this.mapAircraftDates)))
			.subscribe(aircraft => {
				this.aircraftsSubject.next(aircraft);
				this.statusSubject.next(Status.Success);
			})
	}

	public addAircraft(aircraft: CreateAircraft): Observable<Aircraft> {
		return this.httpClient.post<Aircraft>(endpoint, aircraft).pipe(
			tap(aircraft => {
				if (aircraft?.id) {
					this.matSnackBar.open(`${aircraft.registration} has been added`);
					this.loadAircrafts(true);
				}
			})
		);
	}

	public updateAircraft(id: number, aircraft: CreateAircraft): Observable<Aircraft> {
		return this.httpClient.put<Aircraft>(`${endpoint}/${id}`, aircraft).pipe(
			tap(aircraft => {
				if (aircraft?.id) {
					this.matSnackBar.open(`${aircraft.registration} has been updated`);
					this.loadAircrafts(true);
				}
			})
		);
	}

	public deleteAircraft(aircraft: Aircraft): Observable<void> {
		return this.httpClient.delete<void>(`${endpoint}/${aircraft.id}`).pipe(
			tap(() => {
				this.matSnackBar.open(`${aircraft.registration} has been deleted`);
				this.loadAircrafts(true);
			})
		);
	}

	private mapAircraftDates(aircraft: Aircraft): Aircraft {
		aircraft.createdDate = new Date(aircraft.createdDate);
		aircraft.modifiedDate = new Date(aircraft.modifiedDate);
		return aircraft;
	}
}

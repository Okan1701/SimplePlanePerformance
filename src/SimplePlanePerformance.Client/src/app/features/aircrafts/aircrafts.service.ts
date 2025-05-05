import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Aircraft} from '../../shared/models/aircraft.model';
import {environment} from "../../../environments/environment"
import {Status} from '../../shared/enums/status.enum';
import {Injectable} from '@angular/core';
import {CreateAircraft} from '../../shared/models/create-aircraft.model';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

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

	public loadAircrafts(): void {
		if (this.statusSubject.value === Status.Success) return

		this.statusSubject.next(Status.Loading);
		this.httpClient.get<Aircraft[]>(endpoint).subscribe(aircraft => {
			this.aircraftsSubject.next(aircraft);
			this.statusSubject.next(Status.Success);
		})
	}

	public addAircraft(aircraft: CreateAircraft): Observable<Aircraft> {
		return this.httpClient.post<Aircraft>(endpoint, aircraft).pipe(
			tap(aircraft => {
				if (aircraft?.id) {
					this.matSnackBar.open(`${aircraft.registration} has been added`);
					this.statusSubject.next(Status.Loading);
					this.loadAircrafts();
				}
			})
		);
	}

	public deleteAircraft(aircraft: Aircraft): Observable<void> {
		return this.httpClient.delete<void>(`${endpoint}/${aircraft.id}`).pipe(
			tap(() => {
				this.matSnackBar.open(`${aircraft.registration} has been deleted`);
				this.statusSubject.next(Status.Loading);
				this.loadAircrafts();
			})
		);
	}
}

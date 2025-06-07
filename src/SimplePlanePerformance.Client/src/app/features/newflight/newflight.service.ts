import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { FlightDetails } from './flight-details.model';
import { AircraftDetails } from './aircraft-details.model';
import { NewFlight } from './newflight.model';
import { AirportDetails } from './airport-details.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({providedIn: 'root'})
export class NewFlightService {
	private readonly departureIcaoSubject = new BehaviorSubject<string>('');
	private readonly destinationIcaoSubject = new BehaviorSubject<string>('');
	private readonly flightDetailsSubject = new BehaviorSubject<FlightDetails | null>(null);
	private readonly aircraftDetailsSubject = new BehaviorSubject<AircraftDetails | null>(null);
	private readonly airportDetailsSubject = new BehaviorSubject<AirportDetails | null>(null);

	constructor() {
		this.newFlight$.pipe(takeUntilDestroyed()).subscribe(x => console.log(x));
	}

	public get newFlight$(): Observable<NewFlight> {
		return combineLatest([this.flightDetails$, this.aircraftDetails$, this.airportDetails$]).pipe(
			map(([flightDetails, aircraftDetails, airportDetails]) => ({
				flightDetails: flightDetails,
				aircraftDetails: aircraftDetails,
				airportDetails: airportDetails
			}) as NewFlight)
		);
	}

	public get departureIcao$(): Observable<string> {
		return this.departureIcaoSubject.asObservable();
	}

	public get departureIcao(): string {
		return this.departureIcaoSubject.value;
	}

	public set departureIcao(value: string) {
		this.departureIcaoSubject.next(value);
	}

	public get destinationIcao$(): Observable<string> {
		return this.destinationIcaoSubject.asObservable();
	}

	public get destinationIcao(): string {
		return this.destinationIcaoSubject.value;
	}

	public set destinationIcao(value: string) {
		this.destinationIcaoSubject.next(value);
	}

	public get flightDetails$(): Observable<FlightDetails | null> {
		return this.flightDetailsSubject.asObservable();
	}

	public set flightDetails(value: FlightDetails) {
		this.flightDetailsSubject.next(value);
	}

	public get aircraftDetails$(): Observable<AircraftDetails | null> {
		return this.aircraftDetailsSubject.asObservable();
	}

	public set aircraftDetails(value: AircraftDetails | null) {
		this.aircraftDetailsSubject.next(value);
	}

	public get airportDetails$(): Observable<AirportDetails | null> {
		return this.airportDetailsSubject.asObservable();
	}

	public set airportDetails(value: AirportDetails | null) {
		this.airportDetailsSubject.next(value);
	}
}

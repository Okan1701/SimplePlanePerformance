import { Injectable } from '@angular/core';
import { NewFlight } from '../models/newflight.model';
import { NewFLightPerformance } from '../models/newflight-performance.model';
import { TakeoffPerformance } from '../models/takeoff-performance.model';
import { AircraftDetails } from '../models/aircraft-details.model';
import { AirportDetails } from '../models/airport-details.model';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { NewFlightService } from './newflight.service';

@Injectable({providedIn: 'root'})
export class NewFlightPerformanceService {
	private readonly newFlightPerformanceSubject = new BehaviorSubject<NewFLightPerformance | null>(null);


	constructor(newFlightService: NewFlightService) {
		newFlightService.newFlight$
			.subscribe(newFlight => this.calculatePerformance(newFlight));
	}

	public get newFlightPerformance$(): Observable<NewFLightPerformance | null> {
		return this.newFlightPerformanceSubject.asObservable();
	}

	private calculatePerformance(newFlight: NewFlight): void {
		if (!newFlight?.aircraftDetails) {
			throw Error("No aircraft details specified!")
		}
		if (!newFlight?.airportDetails) {
			throw Error("No airport details specified!")
		}
		if (!newFlight?.flightDetails) {
			throw Error("No flight details specified!")
		}

		let performance: NewFLightPerformance = {
			registration: newFlight.aircraftDetails.registration,
			dateOfFlight: newFlight.flightDetails.dateOfFlight,
			departureTakeOff: this.calculateTakeOff(newFlight.aircraftDetails, newFlight.airportDetails, newFlight.flightDetails.departureIcao, true),
			destinationTakeOff: this.calculateTakeOff(newFlight.aircraftDetails, newFlight.airportDetails, newFlight.flightDetails.destinationIcaso, false)
		};
		this.newFlightPerformanceSubject.next(performance);
	}

	private calculateTakeOff(aircraft: AircraftDetails, airport: AirportDetails, icao: string, isDeparture: boolean): TakeoffPerformance {
		let tora = isDeparture ? airport.departureTora : airport.destinationTora;
		let toda = isDeparture ? airport.departureToda : airport.destinationToda;
		let liftOffMargin = aircraft.takeOffLifeoff * 1.25;
		let liftOff50ftMargin = aircraft.takeoffTo50ftHeight * 1.25;

		return {
			icao: icao,
			liftoffDistance: aircraft.takeOffLifeoff,
			liftoffDistanceMargin: liftOffMargin,
			liftoffTo50ftDistance: aircraft.takeoffTo50ftHeight,
			liftoffTo50ftDistanceMargin: liftOff50ftMargin,
			runwayToraUsedPercentage: (liftOffMargin / tora) * 100,
			runwayTodaUsedPercentage: (liftOff50ftMargin / toda) * 100,
		}
	}
}

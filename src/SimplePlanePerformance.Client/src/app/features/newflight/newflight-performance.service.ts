import { Injectable } from '@angular/core';
import { NewFlight } from './newflight.model';
import { NewFLightPerformance } from './newflight-performance.model';
import { TakeoffPerformance } from './takeoff-performance.model';
import { AircraftDetails } from './aircraft-details.model';
import { AirportDetails } from './airport-details.model';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { NewFlightService } from './newflight.service';

@Injectable({providedIn: 'root'})
export class NewFlightPerformanceService {
	private readonly newFlightPerformanceSubject = new BehaviorSubject<NewFLightPerformance | null>(null);


	constructor(newFlightService: NewFlightService) {
		newFlightService.newFlight$
			.pipe(filter(newFlight => !!newFlight?.flightDetails && !!newFlight?.airportDetails && !!newFlight?.aircraftDetails), tap(x => console.log(x)))
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

		let performance = {
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

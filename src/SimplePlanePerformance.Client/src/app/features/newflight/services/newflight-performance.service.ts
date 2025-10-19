import { Injectable } from '@angular/core';
import { NewFlight } from '../models/newflight.model';
import { NewFLightPerformance } from '../models/newflight-performance.model';
import { TakeoffPerformance } from '../models/takeoff-performance.model';
import { AircraftDetails } from '../models/aircraft-details.model';
import { AirportDetails } from '../models/airport-details.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewFlightService } from './newflight.service';
import {FlightDetails} from '../models/flight-details.model';
import {FuelCalculation} from '../models/fuel-calculation.model';

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
			destinationTakeOff: this.calculateTakeOff(newFlight.aircraftDetails, newFlight.airportDetails, newFlight.flightDetails.destinationIcaso, false),
			fuelCalculation: this.calculateFuel(newFlight.aircraftDetails, newFlight.flightDetails)
		};
		this.newFlightPerformanceSubject.next(performance);
	}

	private calculateFuel(aircraftDetails: AircraftDetails, flightDetails: FlightDetails): FuelCalculation {
		let tripFuel = aircraftDetails.aircraft.cruiseFuelLitersPerHour * flightDetails.flightDurationHours;
		tripFuel += aircraftDetails.aircraft.cruiseFuelLitersPerHour * (flightDetails.flightDurationMinutes / 60);

		let contingencyFuel = tripFuel * 0.10;
		let alternateFuel = aircraftDetails.aircraft.cruiseFuelLitersPerHour * flightDetails.alternateFlightDurationHours;
		alternateFuel += aircraftDetails.aircraft.cruiseFuelLitersPerHour * (flightDetails.alternateFlightDurationMinutes / 60);
		let finalReserveFuel = aircraftDetails.aircraft.cruiseFuelLitersPerHour * 0.45;
        
        tripFuel = Math.abs(tripFuel);
        contingencyFuel = Math.abs(contingencyFuel);
        alternateFuel = Math.abs(alternateFuel);
        finalReserveFuel = Math.abs(finalReserveFuel);
        
        let totalFuel = tripFuel + contingencyFuel + alternateFuel + finalReserveFuel;
        let totalEndurance = Math.abs(totalFuel / aircraftDetails.aircraft.cruiseFuelLitersPerHour)

		return {
			tripFuel,
			contingencyFuel,
			alternateFuel,
			finalReserveFuel,
            totalFuel,
            totalEndurance
		}
	}

	private calculateTakeOff(aircraft: AircraftDetails, airport: AirportDetails, icao: string, isDeparture: boolean): TakeoffPerformance {
		let tora = isDeparture ? airport.departureTora : airport.destinationTora;
		let toda = isDeparture ? airport.departureToda : airport.destinationToda;
		let liftOffMargin = aircraft.takeOffLifeoff * 1.25;
		let liftOff50ftMargin = aircraft.takeoffTo50ftHeight * 1.25;

		let windHeading = isDeparture ? airport.departureWindDirection : airport.destinationWindDirection;
		let windSpeed = isDeparture ? airport.departureWindSpeed : airport.destinationWindSpeed;
		let runwayHeading = isDeparture ? airport.departureRwyHdg : airport.destinationRwyHdg;

		// Helper functions
		// Convert angle difference to radians
		const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;
		// Normalize angle to 0-360 range
		const normalizeAngle = (angle: number): number => ((angle % 360) + 360) % 360;

		const angleDifference = normalizeAngle(windHeading - runwayHeading);
		const windAngleRad = toRadians(angleDifference);
		const headWind = +(windSpeed * Math.cos(windAngleRad)).toFixed(2);
		const crossWind = +(windSpeed * Math.sin(windAngleRad)).toFixed(2);

		return {
			icao: icao,
			liftoffDistance: aircraft.takeOffLifeoff,
			liftoffDistanceMargin: liftOffMargin,
			liftoffTo50ftDistance: aircraft.takeoffTo50ftHeight,
			liftoffTo50ftDistanceMargin: liftOff50ftMargin,
			runwayToraUsedPercentage: (liftOffMargin / tora) * 100,
			runwayTodaUsedPercentage: (liftOff50ftMargin / toda) * 100,
			headWind: headWind,
			crossWind: crossWind
		}
	}
}

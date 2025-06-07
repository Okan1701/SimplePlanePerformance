import { FlightDetails } from './flight-details.model';
import { AircraftDetails } from './aircraft-details.model';
import { AirportDetails } from './airport-details.model';

export type NewFlight = {
	flightDetails: FlightDetails | null;
	aircraftDetails: AircraftDetails | null;
	airportDetails: AirportDetails | null;
}

import { TakeoffPerformance } from './takeoff-performance.model';

export type NewFLightPerformance = {
	registration: string,
	dateOfFlight: Date,
	departureTakeOff: TakeoffPerformance,
	destinationTakeOff: TakeoffPerformance
}


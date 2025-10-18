import { TakeoffPerformance } from './takeoff-performance.model';
import {FuelCalculation} from './fuel-calculation.model';

export type NewFLightPerformance = {
	registration: string,
	dateOfFlight: Date,
	departureTakeOff: TakeoffPerformance,
	destinationTakeOff: TakeoffPerformance,
	fuelCalculation: FuelCalculation
}


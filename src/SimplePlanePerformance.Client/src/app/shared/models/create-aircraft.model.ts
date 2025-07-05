import { AircraftType } from '../enums/aircraft-type.enum';
import { FuelType } from '../enums/fuel-type.enum';

export type CreateAircraft = {
  registration: string;
  model: string;
  type: AircraftType;
  fuelType: FuelType;
  maxLandingCrossWind?: number;
  maxLandingTailWind?: number;
  maxTakeoffTailWind?: number;
  maxTakeoffCrossWind?: number;
  cruiseFuelLitersPerHour: number;
}

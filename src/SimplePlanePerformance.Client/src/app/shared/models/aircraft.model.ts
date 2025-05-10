import { AircraftType } from '../enums/aircraft-type.enum';
import { FuelType } from '../enums/fuel-type.enum';

export type Aircraft = {
  id: number;
  createdDate: Date;
  modifiedDate: Date;
  registration: string;
  model: string;
  type: AircraftType;
  fuelType: FuelType;
  maxLandingCrossWind?: number;
  maxLandingTailWind?: number;
  maxTakeoffTailWind?: number;
  maxTakeoffCrossWind?: number;
}

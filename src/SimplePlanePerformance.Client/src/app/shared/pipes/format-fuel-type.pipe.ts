import { Pipe, PipeTransform } from '@angular/core';
import {AircraftType} from '../enums/aircraft-type.enum';
import {FuelType} from '../enums/fuel-type.enum';

@Pipe({
  name: 'formatFuelType'
})
export class FormatFuelTypePipe implements PipeTransform {

  transform(value: FuelType, ...args: unknown[]): unknown {
    switch (value) {
		case FuelType.None:
			return "None";
		case FuelType.Avgas100:
			return "AVGAS 100LL";
		case FuelType.JetA1:
			return "JET A1";
		default:
			return "N/A"
	}
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import {AircraftType} from '../enums/aircraft-type.enum';

@Pipe({
  name: 'formatAircraftType'
})
export class FormatAircraftTypePipe implements PipeTransform {

  transform(value: AircraftType, ...args: unknown[]): unknown {
    switch (value) {
		case AircraftType.None:
			return "None";
		case AircraftType.MultiEnginePiston:
			return "Multi Engine Piston";
		case AircraftType.SingleEnginePiston:
			return "Single Engine Piston";
		case AircraftType.MultiEngineTurbine:
			return "Multi Engine Turbine";
		case AircraftType.SingleEngineTurbine:
			return "Multi Engine Turbine";
		default:
			return "N/A"
	}
  }

}

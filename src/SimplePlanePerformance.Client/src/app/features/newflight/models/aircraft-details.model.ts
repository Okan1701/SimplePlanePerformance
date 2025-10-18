import {Aircraft} from '../../../shared/models/aircraft.model';

export type AircraftDetails = {
	aircraft: Aircraft;
	registration: string;
	takeOffLifeoff: number;
	takeoffTo50ftHeight: number;
	landingGroundTouch: number;
	landingFrom50ftHeight: number;
}

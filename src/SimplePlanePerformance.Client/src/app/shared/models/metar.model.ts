export type Metar = {
	station: string;
	displayName: string;
	category: string;
	observed: Date;
	windDirection: number;
	windSpeedKnots: number;
	altimeterPressureHpa: number;
	altimeterPressureHg: number;
	ceilingFeet: number;
	rawMetar: string;
	isCachedResult: boolean;
};

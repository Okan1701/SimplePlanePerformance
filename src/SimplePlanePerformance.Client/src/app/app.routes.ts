import { Routes } from '@angular/router';
import { AircraftsComponent } from './features/aircrafts/aircrafts.component';
import { NewflightComponent } from './features/newflight/newflight.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'newflight',
		component: NewflightComponent
	},
	{
		path: 'aircraft',
		component: AircraftsComponent
	}
];

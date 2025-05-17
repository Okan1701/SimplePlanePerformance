import { Routes } from '@angular/router';
import {AircraftsComponent} from './features/aircrafts/aircrafts.component';
import { NewflightComponent } from './features/newflight/newflight.component';

export const routes: Routes = [
  {
    path: 'newflight',
    component: NewflightComponent
  },
  {
    path: 'aircraft',
    component: AircraftsComponent
  }
];

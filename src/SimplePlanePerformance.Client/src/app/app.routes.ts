import { Routes } from '@angular/router';
import {AircraftsComponent} from './features/aircrafts/aircrafts.component';

export const routes: Routes = [
  {
    path: 'calculate',
    component: AircraftsComponent
  },
  {
    path: 'aircraft',
    component: AircraftsComponent
  }
];

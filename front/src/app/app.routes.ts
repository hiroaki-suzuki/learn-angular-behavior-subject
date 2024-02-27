import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StatefulComponent } from './pages/stateful/stateful.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stateful', component: StatefulComponent },
];

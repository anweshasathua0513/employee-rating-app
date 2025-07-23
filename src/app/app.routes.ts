import { Routes } from '@angular/router';
import { EmployeeRatingComponent } from './employee-rating/employee-rating.component';

export const routes: Routes = [
  {
    path: 'employee', // This will show a blank form
    component: EmployeeRatingComponent
  },
  {
    path: 'employee/:id', // Load data only when ID is present
    component: EmployeeRatingComponent
  },
  {
    path: '', // Redirect to blank form instead of hardcoded ID
    redirectTo: 'employee',
    pathMatch: 'full'
  }
];


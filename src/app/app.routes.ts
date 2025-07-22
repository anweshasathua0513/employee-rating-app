import { Routes } from '@angular/router';
import { EmployeeRatingComponent } from './employee-rating/employee-rating.component';

export const routes: Routes = [
    {
      path: '', // default route when app loads
    component: EmployeeRatingComponent
  }  
];

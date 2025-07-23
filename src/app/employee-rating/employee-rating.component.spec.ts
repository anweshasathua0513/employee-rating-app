import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 👈 Import this

// import { AppComponent } from './app.component';
import { EmployeeRatingComponent } from './employee-rating.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule, // 👈 Add it here
    EmployeeRatingComponent,
    AppComponent
  ],
  providers: []
})
export class AppModule { }

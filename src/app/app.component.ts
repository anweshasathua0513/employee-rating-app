// import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule, RouterOutlet]
})
export class AppComponent{
  ratings = [1, 2, 3, 4, 5];
  performanceCriteria = [
    '💬Communication',
    '⏰Punctuality',
    '📋Task Allocation',
    '🤝Teamwork',
   ' 🔄Adaptability' ,
   '📊Quantity and Quality'
  ];
 
  formData: any = {};
  employeeId = '';
  employeeName = '';
  designation = '';
  project_name = ''; 

  isDarkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Load saved theme only in browser (avoids localStorage error)
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      }
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  onSubmit() {
    console.log('Submitted Data:', this.formData);
    // you can handle the form data here (e.g., send to backend)
  }
}
 
 
 
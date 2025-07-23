import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-rating.component.html',
  styleUrls: ['./employee-rating.component.css']
})
export class EmployeeRatingComponent implements OnInit {
  ratings = [1, 2, 3, 4, 5];
  performanceCriteria = [
    '💬Communication',
    '⏰Punctuality',
    '📋Task Allocation',
    '🤝Teamwork',
   ' 🔄Adaptability' ,
   '📊Quantity and Quality'
  ];

  employeeId = '';
  employeeName = '';
  designation = '';
  project_name = '';
  formData: { [key: string]: number } = {};
  isDarkMode = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
  const storedTheme = localStorage.getItem('theme');
  this.isDarkMode = storedTheme === 'dark';
  document.body.classList.toggle('dark-mode', this.isDarkMode);

  this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id && id.trim() !== '') {
      // ✅ Only set and load if a real ID is provided
      this.employeeId = id;

      this.http.get<any>(`http://localhost:8080/rating/save/${this.employeeId}`).subscribe({
        next: (data) => {
          this.employeeName = data.employeeName;
          this.designation = data.designation;
          this.project_name = data.projectName;
        },
        error: (err) => {
          console.error('❌ Failed to load employee data:', err);
          alert('Failed to fetch employee details.');
        }
      });
    } else {
      // ✅ Clear all fields for blank route
      this.employeeId = '';
      this.employeeName = '';
      this.designation = '';
      this.project_name = '';
      this.formData = {}; // also clear ratings if needed
    }
  });
}

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  onSubmit(): void {
    const dataToSend = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      designation: this.designation,
      projectName: this.project_name,
      ratings: this.formData
    };

    console.log('📤 Sending to backend:', dataToSend);

    this.http.post(`http://localhost:8080/rating/save/${this.employeeId}`, dataToSend).subscribe({
      next: (response) => {
        console.log('✅ Submitted successfully:', response);
        alert('Form submitted successfully!');
      },
      error: (error) => {
        console.error('❌ Submission failed:', error);
        alert('Submission failed. Please check backend or URL.');
      }
    });
  }
}

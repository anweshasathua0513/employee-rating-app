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

  this.route.queryParamMap.subscribe(params => {
    const empId = params.get('empId'); // ✅ correct key
    const name = params.get('name');
    const designation = params.get('designation');
    const project = params.get('projectName');

    if (empId && name && designation && project) {
      this.employeeId = empId;
      this.employeeName = name;
      this.designation = designation;
      this.project_name = project;

      
      this.http.get<any>(`http://localhost:8080/rating/save/${this.employeeId}`).subscribe({
        next: (data) => {
          console.log('✅ Employee fetched:', data);
          
        },
        error: (err) => {
          console.error('❌ Failed to fetch employee data:', err);
          
        }
      });

    } else {
      console.warn('⚠️ Missing query params!');
      this.employeeId = '';
      this.employeeName = '';
      this.designation = '';
      this.project_name = '';
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

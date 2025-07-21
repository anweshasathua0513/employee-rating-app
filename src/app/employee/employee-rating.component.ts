import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-rating.component.html',
  styleUrls: ['./employee-rating.component.css']
})
export class EmployeeRatingComponent implements OnInit {
punctuality: any;
task_allocation: any;
teamwork: any;
adaptability: any;
communication: any;
quantity_and_quality: any;
submitForm() {
throw new Error('Method not implemented.');
}
  ratings = [1, 2, 3, 4, 5];
  performanceCriteria = [
    'communication',
    'punctuality',
    'task_allocation',
    'teamwork',
    'adaptability',
    'quantity_and_quality'
  ];

  // 🔒 Fetched from backend, not user-editable
  employeeId = '';
  employeeName = '';
  designation = '';
  project_name = '';

  formData: { [key: string]: number } = {};

  constructor(private http: HttpClient) {
    // Initialize formData with default rating (1)
    this.performanceCriteria.forEach(criterion => {
      this.formData[criterion] = 1;
    });
  }

  ngOnInit(): void {
    // Fetch employee info from backend
    this.http.get<any>('http://localhost:8080/rating/save/{id}').subscribe({
      next: (data) => {
        this.employeeId = data.employeeId;
        this.employeeName = data.employeeName;
        this.designation = data.designation;
        this.project_name = data.projectName;
      },
      error: (err) => {
        console.error('❌ Failed to load employee data:', err);
        alert('Failed to fetch employee details.');
      }
    });
  }

  onSubmit() {
    const dataToSend = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      designation: this.designation,
      projectName: this.project_name,
      ratings: this.formData
    };

    console.log('📤 Sending to backend:', dataToSend);

    this.http.post('http://localhost:8080/rating/save/{id}', dataToSend).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//
import jwt_decode from "jwt-decode";
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentId:any
  coursesTab: any;
  constructor(private courseService: CourseService, private router:Router) { }

  ngOnInit() {
    this.reloadData();
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

  reloadData() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      console.log('Decoded token:', decodedToken);
      this.studentId = decodedToken.id; // Access the user ID
      console.log('User ID:', this.studentId);

      // Fetch the assigned courses for the logged-in student
      this.courseService.getAssignedCourses(this.studentId).subscribe(
        (response: any) => {
          console.log('Response from backend:', response);
          this.coursesTab = response.enrolledCourses;
         
        },
        (error: any) => {
          console.error('Error fetching courses:', error);
          // Handle the error here (e.g., show an error message)
        }
      );
    }
  }

  displayNote(courseId: number, studentId: number) {
    this.router.navigate([`notesTab/${courseId}/${studentId}`]);
  }
}
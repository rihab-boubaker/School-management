import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

//
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  addcourseForm: FormGroup;
  course:any={}
  
  userId
  constructor(private courseService: CourseService ,private router:Router, private formBuilder:FormBuilder) { }
 
  ngOnInit() {
    this.addcourseForm=this.formBuilder.group({
      courseName:["", [Validators.required]],
      courseDuration:["", [Validators.required]],
      courseDescription:["", [Validators.required]],
    })

   
  }
  decodeToken(token: string) {
    return jwt_decode(token);
    }

    addCourse() {
      console.log("here course", this.addcourseForm.value);
      const token = sessionStorage.getItem('token');
      if (token) {
        let decodedToken: any = this.decodeToken(token);
        console.log("here decoded token", decodedToken);
        this.userId = decodedToken.id; // Access the user ID
        console.log('User ID:', this.userId);
    
        // Add the teacher's ID to the course data
        
        
        
          this.addcourseForm.value.teacherId=this.userId;
    
        // Send a POST request to your backend
        this.courseService.addCourse(this.addcourseForm.value).subscribe(
          (response) => {
            console.log("Course created:", response);
            this.router.navigate(["teacherCourses"])
            // You can handle success here, e.g., show a success message or redirect.
          },
          (error) => {
            console.error("Error creating course:", error);
            // Handle errors here, e.g., show an error message.
          }
        );
      } 
    }
    
    



}

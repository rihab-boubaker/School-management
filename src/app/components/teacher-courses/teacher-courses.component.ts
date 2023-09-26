import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

//
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  coursesTab: any;
  teacherId:any
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
      this.teacherId = decodedToken.id; // Access the user ID
      console.log('User ID:', this.teacherId);

      // Fetch the courses for the logged-in teacher
      this.courseService.getAllCourses(this.teacherId).subscribe(
        (response: any) => {
          console.log('Response from backend:', response);
          this.coursesTab = response.courses;
        },
        (error: any) => {
          console.error('Error fetching courses:', error);
        }
      );
    }
  }

  deleteCourse(id:number){
    this.courseService.deleteCourse(id).subscribe(
      (reponse) =>{
        console.log("here response after delete", reponse.msg);
      this.reloadData(); 
      })
  }


editCourse(id:number){
 
  this.router.navigate([`editCourse/${id}`])
  
}

displayStudents(id:number){
 
  this.router.navigate([`myStudentsList/${id}`])
  
}

}
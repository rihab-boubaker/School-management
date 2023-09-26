import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-student-to-course',
  templateUrl: './assign-student-to-course.component.html',
  styleUrls: ['./assign-student-to-course.component.css']
})
export class AssignStudentToCourseComponent implements OnInit {
  selectedStudent: number; // Property to hold the selected student's ID
  selectedCourse: number;
  studentsList: any;
  coursesList: any;
  cId: any;
  sId: any;
  constructor(private courseService: CourseService, private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.userService.getAllStudents().subscribe((res) => {
      this.studentsList = res.students;
    })

    this.courseService.getAllCoursesForAdmin().subscribe((res) => {
      this.coursesList = res.courses;
    })
  }

  getCourseId(evt) {

    this.cId = evt.target.value;
    console.log("here selected id", this.cId)
  }
  getStudentId(evt) { 

    this.sId = evt.target.value;
    console.log("here selected id", this.sId)
  }

  

  assign() {
    const assignmentData = {
      courseId: this.cId,
      studentId: this.sId
    };

    this.courseService.assignStudentToCourse(assignmentData).subscribe((data) => {
      console.log("here response from be success")
      this.router.navigate(["coursesList"]);
    })

  }}

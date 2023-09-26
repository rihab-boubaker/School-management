import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  coursesTab: any;
  constructor(private courseService: CourseService, private router:Router) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe(
      (reponse) => {
        console.log("here response after delete", reponse.msg);
        this.reloadData();
      })
  }

  reloadData() {
    this.courseService.getAllCoursesForAdmin().subscribe(
      (response) => {
        console.log("here response from be", response);
        this.coursesTab = response.courses;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  display(courseId:number){
this.router.navigate([`studentsOfTheCourse/${courseId}`])
  }
}
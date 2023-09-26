import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-students-of-the-course',
  templateUrl: './students-of-the-course.component.html',
  styleUrls: ['./students-of-the-course.component.css']
})
export class StudentsOfTheCourseComponent implements OnInit {
  courseId: any;
  students: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get("courseId");
    if (this.courseId) {
      this.courseService.getStudentsForCourse(this.courseId).subscribe(
        (students) => {
          this.students = students;
        },
        (error) => { 
          console.error('Error fetching students:', error);
        }
      );
    }
  } 

}

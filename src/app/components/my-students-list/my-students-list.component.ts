import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-students-list',
  templateUrl: './my-students-list.component.html',
  styleUrls: ['./my-students-list.component.css']
})
export class MyStudentsListComponent implements OnInit {
  courseId: any;
  students: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get("id");
  
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


  addNote(courseId: number, studentId: number){
    this.router.navigate([`addNote/${courseId}/${studentId}`])
  }
  display(courseId: number, studentId: number){
    this.router.navigate([`notesTab/${courseId}/${studentId}`])
  }
  

}

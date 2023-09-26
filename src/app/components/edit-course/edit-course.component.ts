import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course:any;
  //define form Id 
  editCourseForm: FormGroup;
  id:any;
  constructor(private courseService: CourseService ,private router:Router, private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getCourseById(this.id).subscribe((result) => {
      this.course = result.course;
    })
    this.editCourseForm = this.formBuilder.group({
      courseName:["", [Validators.required]],
      courseDuration:["", [Validators.required]],
      courseDescription:["", [Validators.required]],
    })
  }
  validate() {

    console.log("here object", this.editCourseForm.value)
    this.courseService.updateCourse(this.course).subscribe((data) => {
      console.log("here response from be", data.msg);
      this.router.navigate(["teacherCourses"])
    });
  }
}



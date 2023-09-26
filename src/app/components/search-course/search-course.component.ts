import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  searchCourseForm: FormGroup;
  errorMsg: string;
  courses: any; // Array to store search results
  childId:any;
  constructor(private courseService:CourseService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.searchCourseForm = this.formBuilder.group({

      childNumber: ["", [Validators.required]],
   


    });
  }

  searchCourse() {
console.log(this.searchCourseForm.value)

      this.courseService.searchCoursesByChildNumber(this.searchCourseForm.value).subscribe(
        (result) => {
          console.log("here object from be", result.courses);
          this.courses = result.courses;
          this.childId = result.childId;
     
        });
    
  }

  
  displayNote(courseId: number, studentId: number) {
    this.router.navigate([`notesTab/${courseId}/${this.childId}`]);
  }

}

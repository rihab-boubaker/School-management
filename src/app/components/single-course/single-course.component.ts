import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  @Input() courseInput: any;
  constructor() { }

  ngOnInit() {
  }

}

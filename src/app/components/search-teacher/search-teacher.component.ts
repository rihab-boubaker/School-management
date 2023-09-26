import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  searchTeacherForm: FormGroup;
  errorMsg: string;
  teachers: any; // Array to store search results
  speciality:any={};

  constructor(
    private userService: UserService,
   
   
  ) {}

  ngOnInit() {
 
  }

  searchTeacher() {
    if (!this.speciality.speciality) {
      this.errorMsg = "Speciality is required."} 
     else {this.errorMsg = ""
  }
  console.log(this.speciality)

      this.userService.searchTeachersBySpeciality(this.speciality).subscribe(
        (result) => {
          console.log("here object from be", result.teachers);
          this.teachers = result.teachers;
         
        });
    
  }
}



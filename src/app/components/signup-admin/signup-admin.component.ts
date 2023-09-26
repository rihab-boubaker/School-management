import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  errorMsg: string = "";
  constructor(private formBuilder: FormBuilder,private userService: UserService, private router: Router) { }
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      tel: ["", [Validators.required]],
    });
  }
  signup(){
    console.log("here user", this.signupForm.value)
    this.signupForm.value.role = "admin";
    this.userService.signupAdmin(this.signupForm.value).subscribe((data) => {
      console.log("here data after signup", data.msg)
      if (data.msg == "0") {
        this.errorMsg = "email exists"
      } else {
        this.router.navigate(["login"]);
      }
    });
  }

}

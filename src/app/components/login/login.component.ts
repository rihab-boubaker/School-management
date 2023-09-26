import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
//import jwt decode
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {}
  
  errorMsg: string; 
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      tel: ["", [Validators.required]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],


    });
  }

  login() {
    console.log("here object", this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe((data) => {
        console.log("here data after login", data);
        if (data.result) {
            sessionStorage.setItem("token", data.result);
            let decodedToken: any = this.decodeToken(data.result);
            console.log("here decoded token", decodedToken);

            if (decodedToken.role === "teacher") {
                if (decodedToken.status === "ok") {
                    this.router.navigate(["teacherDashboard"]);
                } else if (decodedToken.status === "nok") {
                    this.errorMsg = "Please wait for verification";
                }
            } else if (decodedToken.role === "student") {
                this.router.navigate(["studentDashboard"]);
            } else if (decodedToken.role === "parent") {
                this.router.navigate([""]);
            } else if (decodedToken.role === "admin") {
                this.router.navigate(["adminDashboard"]);
            }
           } else {
            this.errorMsg = "please check email/password";
        }
    }); 
}

  decodeToken(token: string) {
    return jwt_decode(token);
    }

}

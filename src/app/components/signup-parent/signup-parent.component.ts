import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {
  errorMsg: string = "";
  constructor(private formBuilder: FormBuilder,private userService: UserService, private router: Router) { }
  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      childNumber: ["",[Validators.required]],
      adress: ["",[Validators.required]],
      tel: ["",[Validators.required]],
      
      
    });
  }

  signup() {
    console.log("here user", this.signupForm.value);
    this.signupForm.value.role = "parent";
    this.userService.signupParent(this.signupForm.value).subscribe((data) => {
        console.log("here data after signup", data.msg);
        if (data.msg === "0") {
            this.errorMsg = "Tel exists";
        } else if (data.msg === "Child number not found") {
            this.errorMsg = "Child number not found";
        } else if (data.msg === "success") {
            this.router.navigate(["login"]);
        } else {
            // Handle other possible responses
        }
    });
}


}

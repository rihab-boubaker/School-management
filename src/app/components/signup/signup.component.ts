import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imagePreview:any;
  errorMsg: string = "";
  constructor(private formBuilder: FormBuilder,private userService: UserService, private router: Router) { }
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      tel: ["",[Validators.required]],
      adress: ["",[Validators.required]],
      img: [""] 
    });
  }


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

    signup(){
      console.log("here user", this.signupForm.value)
      this.signupForm.value.role = "student"
      this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe((data) => {
        console.log("here data after signup", data.msg)
        if (data.msg == "0") {
          this.errorMsg = "email exists"
        } else {
          this.router.navigate(["login"]);
        }
      });
    }

}

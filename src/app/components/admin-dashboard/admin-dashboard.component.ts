import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  teachersTab: any ;
  teacher:any={};
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.reloadData();
  } 
 
  validateTeacher(teacherId: string) {
    this.userService.validateTeacher(teacherId).subscribe(
      (response) => {
        console.log(response.message);
        // Update the local data or refresh the data as needed
        this.reloadData();
      },
      (error) => {
        console.error("Error validating teacher:", error);
      }
    );
  }

  deleteTeacher(id:number){
    this.userService.deleteUser(id).subscribe(
      (reponse) =>{
        console.log("here response after delete", reponse.msg);
      this.reloadData(); 
      })
  }

reloadData(){
  this.userService.getAllTeachers().subscribe(
    (response) =>{
      console.log("here response from be", response);
      this.teachersTab=response.teachers;
    });
}

}

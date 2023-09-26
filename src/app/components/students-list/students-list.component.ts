import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  studentsTab: any ;
  
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteStudent(id:number){
    this.userService.deleteUser(id).subscribe(
      (reponse) =>{
        console.log("here response after delete", reponse.msg);
      this.reloadData(); 
      })
  }

reloadData(){
  this.userService.getAllStudents().subscribe(
    (response) =>{
      console.log("here response from be", response);
      this.studentsTab=response.students;
    });
}

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.component.html',
  styleUrls: ['./parents-list.component.css']
})
export class ParentsListComponent implements OnInit {

parentsTab:any;
  constructor(private userService:UserService,) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteParent(id:number){
    this.userService.deleteUser(id).subscribe(
      (reponse) =>{
        console.log("here response after delete", reponse.msg);
      this.reloadData(); 
      })
  }

reloadData(){
  this.userService.getAllParents().subscribe(
    (response) =>{
      console.log("here response from be", response);
      this.parentsTab=response.parents;
    });
}

}

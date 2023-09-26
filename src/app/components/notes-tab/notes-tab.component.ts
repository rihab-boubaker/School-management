import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes-tab',
  templateUrl: './notes-tab.component.html',
  styleUrls: ['./notes-tab.component.css']
})
export class NotesTabComponent implements OnInit {
  studentId: any;
  courseId:any;
  notesTab:any;
  constructor( private noteService:NoteService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId');
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    console.log('studentId:', this.studentId);
    console.log('courseId:', this.courseId);
    this.noteService.getNotesByStudentAndCourse(this.studentId, this.courseId).subscribe(
      (response) => {
        console.log('Notes response:', response);
        this.notesTab = response;
        console.log(this.notesTab)
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }
  

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  noteForm: FormGroup;
  studentId: any;
  courseId:any;
  constructor(private noteService: NoteService ,private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder
  ,private router:Router) { }

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId');
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');

    this.noteForm = this.formBuilder.group({
      note: ["", [Validators.required]],
      evaluation: ["", [Validators.required]],
    
    });
  }

  onSubmit(){
    this.noteForm.value.studentId=this.studentId;
    this.noteForm.value.courseId=this.courseId;
    this.noteService.addNoteToCourse( this.noteForm.value).subscribe(
      (response) => {
        // Handle success, e.g., show a success message, navigate back, etc.
        console.log('Note added successfully:', response);
        this.router.navigate([`notesTab/${this.courseId}/${this.studentId}`])
        // Redirect to the student detail page or any other appropriate page
        // this.router.navigate([`/student-detail/${this.studentId}`]);
      },
      (error) => {
        // Handle error, e.g., display an error message, log the error, etc.
        console.error('Error adding note:', error);
      }
    );
    
  }

}

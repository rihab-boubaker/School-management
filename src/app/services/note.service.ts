import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteURL: string = "http://localhost:3000/notes";
  constructor(private http: HttpClient) { }


  
  addNoteToCourse(obj) {
    return this.http.post<{ msg: any }>(this.noteURL, obj);
  }


  getNotesByStudentAndCourse(studentId: string, courseId: string) {
   
    return this.http.get<{ notes: any, msg: string}>(`${this.noteURL}/${courseId}/${studentId}`);
  }
}

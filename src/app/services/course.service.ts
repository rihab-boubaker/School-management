import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string = "http://localhost:3000/courses";
  constructor(private http: HttpClient) { }


  addCourse(obj: any) {
    return this.http.post<{ msg: any }>(this.courseURL, obj);
  }

  getAllCourses(teacherId) {
    return this.http.get<{ courses: any, msg: string, error: any }>(`${this.courseURL}/teacherCourses/${teacherId}`)
  }

  deleteCourse(id) {
    return this.http.delete<{ msg: string }>(`${this.courseURL}/${id}`)
  }

  getCourseById(id) {
   
    return this.http.get<{ course: any, msg: string }>(`${this.courseURL}/${id}`);
  }

  updateCourse(obj){
    return this.http.put<{msg: any}>(this.courseURL, obj);
  }

  getAllCoursesForAdmin() {
    return this.http.get<{ courses: any}>(this.courseURL)
  }

  assignStudentToCourse(assignmentData) {
    return this.http.post(this.courseURL+"/assign", assignmentData);
  }

  getAssignedCourses(studentId: number) {
    return this.http.get(`${this.courseURL}/assignedCourses/${studentId}`);
  }
 
  getStudentsForCourse(courseId: number) {
    return this.http.get<{enrolledStudents: any}>(`${this.courseURL}/students/${courseId}`);
  }

  searchCoursesByChildNumber(obj){
    return this.http.post<{courses: any,childId:any}>(this.courseURL+"/searchbyNumber",obj);
  }
}

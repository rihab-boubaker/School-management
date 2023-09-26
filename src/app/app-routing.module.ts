import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { MyStudentsListComponent } from './components/my-students-list/my-students-list.component';
import { AssignStudentToCourseComponent } from './components/assign-student-to-course/assign-student-to-course.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NotesTabComponent } from './components/notes-tab/notes-tab.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { StudentsOfTheCourseComponent } from './components/students-of-the-course/students-of-the-course.component';

import { SearchCourseComponent } from './components/search-course/search-course.component';
import { ParentsListComponent } from './components/parents-list/parents-list.component';


const routes: Routes = [
  { path:"", component:HomeComponent},
  { path:"signupStudent", component:SignupComponent},
  { path:"signupTeacher", component:SignupTeacherComponent},
  { path:"signupParent", component:SignupParentComponent},
  { path:"signupAdmin", component:SignupAdminComponent},
  { path:"login", component:LoginComponent},
  {path:"adminDashboard", component:AdminDashboardComponent},
  {path:"studentDashboard", component:StudentDashboardComponent},
  {path:"teacherDashboard", component:TeacherDashboardComponent},
  {path:"studentsList", component:StudentsListComponent},
  {path:"parentsList", component:ParentsListComponent},
  {path:"coursesList", component:CoursesListComponent},
  {path:"teacherCourses", component:TeacherCoursesComponent},
  {path:"editCourse/:id", component:EditCourseComponent},
  {path:"myStudentsList/:id", component:MyStudentsListComponent},
  {path:"assignDtudentToCourse", component:AssignStudentToCourseComponent},
  {path:"addNote/:courseId/:studentId", component:AddNoteComponent},
  {path:"notesTab/:courseId/:studentId", component:NotesTabComponent},

  {path:"searchTeacher", component:SearchTeacherComponent},
  {path:"searchCourse", component:SearchCourseComponent},
  {path:"studentsOfTheCourse/:courseId", component:StudentsOfTheCourseComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from "@angular/common/http";
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { MyStudentsListComponent } from './components/my-students-list/my-students-list.component';
import { AssignStudentToCourseComponent } from './components/assign-student-to-course/assign-student-to-course.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NotesTabComponent } from './components/notes-tab/notes-tab.component';
import { MyNotesComponent } from './components/my-notes/my-notes.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { StudentsOfTheCourseComponent } from './components/students-of-the-course/students-of-the-course.component';

import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { ParentsListComponent } from './components/parents-list/parents-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SignupTeacherComponent,
    SignupParentComponent,
    SignupAdminComponent,
    LoginComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    StudentsListComponent,
    CoursesListComponent,
    TeacherCoursesComponent,
    EditCourseComponent,
    MyStudentsListComponent,
    AssignStudentToCourseComponent,
    AddNoteComponent,
    NotesTabComponent,
    MyNotesComponent,
    SearchTeacherComponent,
    StudentsOfTheCourseComponent,
   
    SingleTeacherComponent,
    TeachersComponent,
    CoursesComponent,
    SingleCourseComponent,
    SearchCourseComponent,
    ParentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

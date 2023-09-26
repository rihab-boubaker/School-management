import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  signup(obj: any, img: File) {
    
    let fData=new FormData();
   
    fData.append("img",img); 
    fData.append("firstName",obj.firstName);
    fData.append("lastName",obj.lastName);
    fData.append("email",obj.email);
    fData.append("pwd",obj.pwd);
    fData.append("tel",obj.tel);
    fData.append("adress",obj.adress);
    fData.append("role",obj.role);
    

    //
    // if (obj.role == 'teacher') {
    //   fData.append('speciality', obj.speciality);
    //   fData.append('fichier', obj.cvPdf);
    // } else if (obj.role == 'student') {
    //   if (fichier) {
    //     fData.append('img', fichier);
    //   }
    // } else if (obj.role == 'parent') {
    //   fData.append('studentPhoneNumber', obj.studentPhoneNumber);
    // }
    return this.http.post<{ msg: string }>(this.userURL + "/signup", fData)
  }

  signupTeacher(obj: any, pdf: File) {
    
    let fData=new FormData();
   
    fData.append("pdf",pdf); 
    fData.append("firstName",obj.firstName);
    fData.append("lastName",obj.lastName);
    fData.append("email",obj.email);
    fData.append("pwd",obj.pwd);
    fData.append("tel",obj.tel);
    fData.append("adress",obj.adress);
    fData.append("speciality",obj.speciality);
    fData.append("role",obj.role);
    
    return this.http.post<{ msg: string }>(this.userURL + "/signupTeacher", fData)
  }

  signupParent(obj: any) {
    
    return this.http.post<{ msg: string }>(this.userURL + "/signupParent", obj)
  }

  signupAdmin(obj: any) {
    
    return this.http.post<{ msg: string }>(this.userURL + "/signupAdmin", obj)
  }

  login(user) {
    return this.http.post<{ result: any, msg: string }>(this.userURL + "/login", user);
  }

  getAllTeachers(){
    return this.http.get<{teachers: any}>(this.userURL+"/teachers")
  }

  validateTeacher(teacherId: string) {
    return this.http.put<{ message: string }>(
      `${this.userURL}/teachers/${teacherId}/validate`,
      {}
    );
  }

  deleteUser(id){
    return this.http.delete<{msg:string}>(`${this.userURL}/${id}`)
  }

  getAllStudents(){
    return this.http.get<{students: any}>(this.userURL+"/students")
  }

  getAllParents(){
    return this.http.get<{parents: any}>(this.userURL+"/parents")
  }

  searchTeachersBySpeciality(obj) {
  
    return this.http.post<{teachers: any}>(this.userURL + "/searchTeachers", obj);
}

 
 
} 

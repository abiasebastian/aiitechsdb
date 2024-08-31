import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient ) { }
  apiurl = 'http://localhost:3000/api/';
  userdata:any;

 

  getAll() {
    return this.http.get(this.apiurl+'getAll',)
  };

  async getByCode(code: any) {
     return this.http.get(this.apiurl +'getByKeyValue' , code)
  }

  post(inputdata: any) {
    return this.http.post(`${this.apiurl}post`, inputdata)
  }

  updateUser(code: any, inputdata: any) {
    let a=`${this.apiurl}update/${code}`
    console.log(code)
    console.log(inputdata)
    console.log(a)
   return this.http.patch(a,inputdata)
  }

  loginCheck() {
    return sessionStorage.getItem('username') != null
  }
  getUserRole() {
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString : '';
  }
  UsernameAvailability(code:any){
     if(this.http.get(this.apiurl +'?username=' + code)){
      return false
     }
     else{
      return true
     }
  }
}

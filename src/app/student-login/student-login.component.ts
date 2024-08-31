import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
    private http: HttpClient
  ) {
    const userData = sessionStorage.getItem('userdata')
    let user = null
    if (userData) {
      user = JSON.parse(userData)
    }
    if (user) {
      if (user.admin) {
        this.route.navigate(['admindashboard'])
      }
      if (user.admin === false) {
        this.route.navigate(['profile'])
      }
      else{

      }
    }
  }

  userdata: any;
  form: any;
  response: any;
  user: any;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required])),
    password: this.builder.control('', Validators.required),
  });

  async startLogin() {
    if (this.loginForm.valid) {
      this.form = this.loginForm.value
      console.log(this.loginForm.value);


      try {
        this.http.post('http://127.0.0.1:3000/api/auth', this.form).subscribe(
          (res) => {
            // Handle the successful response here
            console.log(res)

            this.response = res
            this.user = this.response.user
            console.log(this.user)
            if (this.response.authenticated === 'yes') {
              sessionStorage.setItem('userdata', JSON.stringify(this.user))
              console.log('Login successful');
              if (this.user.admin) {
                this.route.navigate(['admindashboard']);
              }
              else {
                this.route.navigate(['profile'])
              }
            }
            if (this.response.authenticated === 'no') {
              this.toast.error('Wrong Credentials')
            }
            else {
              this.toast.error('An error occured')
            }
          }
        );
      } catch (error) {
        // Handle other errors
        console.error('Error during login:', error);
        this.toast.error('An error occurred during login.');
      }

    } else {
      this.toast.warning('Invalid Entry');
    }
  }

}

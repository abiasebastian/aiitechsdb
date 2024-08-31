import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private toast: ToastrService,private builder: FormBuilder,private route:Router,private http:HttpClient){}
  loginForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required])),
    password: this.builder.control('', Validators.required),
    role:this.builder.control('',Validators.required)
  });
  form: any;

  async studentLogin() {
    if (this.loginForm.valid) {
      this.form = this.loginForm.value
      console.log(this.loginForm.value);


      try {
        this.http.post('http://localhost:3000/api/auth', this.form).subscribe(
          (res:any) => {
            // Handle the successful response here
            console.log(res)

          
            console.log(res.user)
            if (res.authenticated === 'yes' && res.user.role==='admin') {
              sessionStorage.setItem('user', JSON.stringify(res.user))
              console.log('Admin Login successful');
              
                this.route.navigate(['admindashboard'])
              
            }
            if (res.authenticated === 'yes' && res.user.role==='student') {
              sessionStorage.setItem('user', JSON.stringify(res.user))
              console.log('Student Login successful');
              
                this.route.navigate(['profile'])
              
            }
            if (res.authenticated === 'yes' && res.user.role==='trainer') {
              sessionStorage.setItem('user', JSON.stringify(res.user))
              console.log('Trainer Login successful');
              
                this.route.navigate(['profile'])
              
            }
            if (res.authenticated === 'no') {
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

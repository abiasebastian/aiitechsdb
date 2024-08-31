import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';



@Component({
  selector: 'app-add-and-edit-students',
  templateUrl: './add-and-edit-students.component.html',
  styleUrls: ['./add-and-edit-students.component.css']
})
export class AddAndEditStudentsComponent implements OnInit {
  userEditObject: any = '';
  edituser: boolean = false;
  currenturl = this.route.url;
  object: any;
  registerform: any;
  photoFileName = '';
  aadhaarFrontFileName = '';
  aadhaarBackFileName = '';
  emittedusername: any;
  unfieldcontrol: any;
  courseArray: any;
  trainerArray:any;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    if (this.route.url == '/student-edit') {
      this.edituser = true;
      this.object = sessionStorage.getItem('userEditObject');
      this.userEditObject = JSON.parse(this.object);
    } else {
      this.edituser = false;
      this.userEditObject = { name: '', sex: '', address: '', email: '', mobile: '', course: '', fee: '', schedule: '', username: null, password: '', SARF: '', DOB: null,trainer:null };
    }

    this.registerform = this.builder.group({
      name: [this.userEditObject.name],
      sex: [this.userEditObject.sex],
      address: [this.userEditObject.address],
      email: [this.userEditObject.email],
      mobile: [this.userEditObject.mobile],
      course: [this.userEditObject.course],
      fee: [this.userEditObject.fee],
      schedule: [this.userEditObject.schedule],
      username: [this.userEditObject.username,{validators: [Validators.required], asyncvalidators:[this.userNameAvailabilityCheck]}],
      password: [this.userEditObject.password],
      SARF: [this.userEditObject.SARF],
      DOB: [this.userEditObject.DOB],
      trainer:[this.userEditObject.trainer],
      role:[this.userEditObject.role],
    });

    this.http.get('http://localhost:3000/api/getAllCourses').subscribe(
(array)=>{
  this.courseArray=array
})

this.http.get('http://localhost:3000/api/getAllTrainers').subscribe(
(array)=>{
  this.trainerArray=array
})

  }




  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.photoFileName = file.name;
      const formData = new FormData();
      formData.append("photo", file);
      const upload$ = this.http.post("http://localhost:3000/api/photoUpload", formData);
      upload$.subscribe();
    }
  }

  onAadhaarFrontSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.aadhaarFrontFileName = file.name;
      const formData = new FormData();
      formData.append("aadhaarFront", file);
      const upload$ = this.http.post("http://localhost:3000/api/aadhaarFrontUpload", formData);
      upload$.subscribe();
    }
  }

  onAadhaarBackSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.aadhaarBackFileName = file.name;
      const formData = new FormData();
      formData.append("aadhaarBack", file);
      const upload$ = this.http.post("http://localhost:3000/api/aadhaarBackUpload", formData);
      upload$.subscribe();
    }
  }

  startRegister() {
    if (this.registerform.valid) {
      console.log(this.registerform.value);
      this.http.post('http://localhost:3000/api/student-reg',this.registerform.value).subscribe(
        res => {
          this.toast.success('Awaiting admin verification', 'Registered Successfully');
          this.route.navigate(['adminDashboard']);
        },
        error => {
          console.error('Error registering:', error);
          this.toast.warning('Registration failed. Please try again.');
        }
      );
    } else {
      this.toast.warning('Invalid Entry');
    }
  }

  userNameAvailabilityCheck = (control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.log(control.value);

    return new Promise((resolve, reject) => {
      if (!control.value) {
        // Handle the case where the control value is empty or undefined
        resolve({ empty: true });
      } else {
        this.http.post('http://localhost:3000/api/userNameAvailabilityCheck', { username: control.value })
          .pipe(
            map((emittedvalue: any) => {
              console.log('response from username availability: ', emittedvalue);
              if (emittedvalue.available === 'no') {
                return { usernameNotAvailable: true };
              } else if (emittedvalue.available === 'yes') {
                return null;
              } else {
                return { unknownError: true };
              }
            })
          )
          .subscribe(
            (validationResult) => {
              resolve(validationResult);
            },
            (error) => {
              console.error('Error checking username availability:', error);
              reject({ usernameCheckError: 'An error occurred while checking username availability' });
            }
          );
      }
    });
  };




  check() {
    console.log(this.userEditObject);
    console.log(this.userNameAvailabilityCheck)
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
      return { noSpace: true };
    }
    return null;
  }

  update() {
    if (this.registerform.valid) {
      this.auth.updateUser(this.userEditObject._id, this.registerform.value).subscribe();
      console.log(this.userEditObject._id)
      this.route.navigate(['admindashboard'])
    } else {
      console.log('Invalid Entry');
    }
  }
}
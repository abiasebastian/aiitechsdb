import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-and-edit-trainers',
  templateUrl: './add-and-edit-trainers.component.html',
  styleUrls: ['./add-and-edit-trainers.component.css']
})
export class AddAndEditTrainersComponent implements OnInit {
  trainerEditObject: any = '';
  edituser: boolean = false;
  currenturl = this.route.url;
  sessStor: any;
  registerform: any;
  photoFileName = '';
  aadhaarFrontFileName = '';
  aadhaarBackFileName = '';
  emittedusername: any;
  unfieldcontrol: any;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    if (this.route.url == '/edit-trainer') {
      this.edituser = true;
      this.sessStor = sessionStorage.getItem('trainerEditObject');
      this.trainerEditObject = JSON.parse(this.sessStor);
    } else {
      this.edituser = false;
      this.trainerEditObject = { name: '', sex: '', address: '', email: '', mobile: '', courses: '', schedule: '', username: null, password: '', DOB: null };
    }

    this.registerform = this.builder.group({
      name: [this.trainerEditObject.name],
      sex: [this.trainerEditObject.sex],
      address: [this.trainerEditObject.address],
      email: [this.trainerEditObject.email],
      mobile: [this.trainerEditObject.mobile],
      courses: [this.trainerEditObject.courses],
      schedule: [this.trainerEditObject.schedule],
      username: [this.trainerEditObject.username, [Validators.required, this.validate],[this.userNameAvailabilityCheck]],
      password: [this.trainerEditObject.password],
      DOB: [this.trainerEditObject.DOB]
    });

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
      this.http.post('http://localhost:3000/api/trainer-reg', this.registerform.value).subscribe(
        res => {
          console.log(res)
          this.toast.success( 'Registered Successfully');
          this.route.navigate(['admindashboard']);
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

  userNameAvailabilityCheck = (control: FormControl): Promise<ValidationErrors | null> => {
    console.log(control.value)

    return new Promise((resolve, reject) => {
      if (!control.value) {
        // Handle the case where the control value is empty or undefined
        resolve({ empty: true });
      } else {
        this.http.post('http://localhost:3000/api/trainerUserNameAvailabilityCheck', { username: control.value })
          .subscribe(
            (emittedvalue) => {
              this.emittedusername = emittedvalue;
              if (this.emittedusername.available === 'no') {
                resolve({ usernameNotAvailable: true });
              } if (this.emittedusername.available === 'yes') {
                resolve(null);
              }
              else {
                resolve({ unknownError: true })
              }
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
    console.log(this.trainerEditObject);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
      return { noSpace: true };
    }
    return null;
  }

  update() {
    if (this.registerform.valid) {
      this.auth.updateUser(this.trainerEditObject._id, this.registerform.value).subscribe();
      console.log(this.trainerEditObject._id)
      this.route.navigate(['admindashboard'])
    } else {
      console.log('Invalid Entry');
    }
  }
}
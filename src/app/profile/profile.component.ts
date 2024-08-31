import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private http: HttpClient, private router: Router, private form: FormBuilder, private logout: LogoutService) {
    this.object = sessionStorage.getItem('studentData')
    this.objectParse = JSON.parse(this.object)
    console.log(this.objectParse._id)

    this.http.get(`http://localhost:3000/api/getStudentById/${this.objectParse._id}`).subscribe(
      (user) => {
        console.log(user)
        this.userData = user
        console.log(this.userData)
        this.http.get(`http://localhost:3000/api/getCourseById/${this.userData.course}`).subscribe((courseObject) => {
          this.course = courseObject

          console.log(this.course)
        })

        if (this.userData && this.userData.feeObject) {
          this.feeObjectArray = this.userData.feeObject;
          this.sumOfFee = this.calculateSumOfValues(this.feeObjectArray, 'amount');
          console.log(this.sumOfFee);
          this.feeProgressBarWidth = `${(this.sumOfFee / this.userData.fee) * 100}%`;
        } else {
          this.feeObjectArray = []
          this.sumOfFee = 0
          this.feeProgressBarWidth = '0%'

        }

        if (this.userData && this.userData.attendanceObject) {
          this.attendanceObjectArray = this.userData.attendanceObject;
          this.sumOfAttendance = this.calculateSumOfValues(this.attendanceObjectArray, 'hours');
          console.log(this.sumOfAttendance);
          this.attendanceProgressBarWidth = `${(this.sumOfAttendance / this.userData.attendance) * 100}%`;
        } else {
          this.attendanceObjectArray = []
          this.sumOfAttendance = 0
          this.attendanceProgressBarWidth = '0%'

        }
      })






  }


  object: any
  userData: any
  sumOfFee: any = null
  sumOfAttendance: any
  feeObjectArray: any
  feeProgressBarWidth: any
  attendanceObjectArray: any
  attendanceProgressBarWidth: any
  course: any
  objectParse: any;



  feeEditForm: FormGroup = this.form.group({
    date: new FormControl(''),
    recieptNo: new FormControl(''),
    amount: new FormControl('')
  });

  addAttForm: FormGroup = this.form.group({
    date: new FormControl(''),
    hours: new FormControl(''),

  });
  stringSessionStorage:any=sessionStorage.getItem('user')
  parsedSessionStorage:any=JSON.parse(this.stringSessionStorage)



  feeSubmit() {
    const formValue = this.feeEditForm.value;
    console.log(formValue);


    const apiUrl = `http://localhost:3000/api/feeUpdate/${this.userData._id}`;

    this.http.patch(apiUrl, formValue)
      .subscribe(response => {
        console.log('API Response:', response);
      }, error => {
        console.error('API Error:', error);
      });

  }

  attSubmit() {
    const formValue = this.addAttForm.value;
    console.log(formValue);


    const apiUrl = `http://localhost:3000/api/attUpdate/${this.userData._id}`;

    this.http.patch(apiUrl, formValue)
      .subscribe(response => {
        console.log('API Response:', response);
      }, error => {
        console.error('API Error:', error);
      });

  }






  consoleUser() {
    console.log(this.userData);
  }



  calculateSumOfValues(array: any[], key: string): number {
    let sum = 0;

    for (const obj of array) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (!isNaN(value)) {
          sum += Number(value);
        }
      }
    }

    return sum;
  }

  logOut() {
    this.logout.logOut()
    this.router.navigate([''])
  }



}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  filter = { FSD: true, AI: true, DM: true }
  filteredStudents: any
  trainerArray: any
  courseArray: any
  nonStringStudent: any
  courseEditObject: any
  studentId: any
  fetchCourseName: any = (id: string) => {
    return this.http.get('http://localhost:3000/')
  }

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router, private http: HttpClient, private form: FormBuilder) {

    this.loadStudents()
    this.loadTrainers()
    this.loadCourses()

  }

  addCourseForm: FormGroup = this.form.group({
    course: new FormControl(''),
    fee: new FormControl(''),
    duration: new FormControl(''),
    syllabus: new FormControl(''),
    trainers: new FormControl('')
  });

  putUnit(): FormGroup {
    return new FormGroup({
      unit: new FormControl(''),
      lesson: new FormArray([this.putNewLesson()])

    })
  }

  addNewUnit() {
    return this.SyllabusArray().push(this.putUnit())
  }
  putNewLesson() {
    return new FormGroup({
      lessons: new FormControl("")
    });

  }
  SyllabusArray() {
    return this.addCourseForm.get('syllabus') as FormArray

  }

  // subjectsArray(i: number) {
  //   return this.subjectsFormGroup(i).get("studentSubjectArray") as FormArray;
  // }
  // subjectsFormGroup(i: number) {
  //   return this.studentListArray().at(i).get("studentSubjects") as FormGroup;
  // }


  loadCourseName(id: string) {
    let cName
    this.http.get(`http://localhost:3000/api/getCourseById/${id}`).subscribe((courseName) => {
      cName = courseName
    }).unsubscribe()
    console.log(cName)
    return cName
  }

  async navigateToProfile(id: string) {
    console.log(id)
    this.studentId = id
    await this.http.get(`http://localhost:3000/api/getStudentById/${this.studentId}`).subscribe(data => {
      console.log(data)
      this.nonStringStudent = data

      console.log(this.nonStringStudent)
      let stringfiedStudent = JSON.stringify(this.nonStringStudent)
      sessionStorage.setItem('studentData', stringfiedStudent)
      this.router.navigate(['profile'])
    })

  }



  loadCourses() {
    this.http.get('http://localhost:3000/api/getAllCourses').subscribe(
      (array) => {
        this.courseArray = array
      }
    )
  }

  loadStudents() {
    this.http.get('http://localhost:3000/api/getAllStudents').subscribe((array) => {
      this.filteredStudents = array

      console.log(array)

    })
  }

  loadTrainers() {
    this.http.get('http://localhost:3000/api/getAllTrainers').subscribe(
      (array) => {
        this.trainerArray = array
        console.log('trainerArray :', this.trainerArray)
      }
    )
  }

  ascSort() {
    this.filteredStudents.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)

  }

  filterChange() {
    this.filteredStudents = this.filteredStudents.filter((x: any) => {
      return (x.course === 'FSD' && this.filter.FSD)
        || (x.course === 'AI' && this.filter.AI)
        || (x.course === 'DM' && this.filter.DM)
    })
  }

  userProfile(user: any) {
    console.log(user)
    sessionStorage.setItem('userdata', user)
    this.router.navigate(['profile'])
  }

  navigateToEditStudent(user: any) {
    sessionStorage.setItem('userEditObject', JSON.stringify(user))
    this.router.navigate(['student-edit'])
  }

  navigateToAddTrainer() {
    this.router.navigate(['trainer-reg'])
  }

  deleteUser(id: any, role: string) {
    try {
      console.log('console @ line 151 : ', id)
      return this.http.delete(`http://localhost:3000/api/delete/${id}/${role}`).subscribe(
        (res) => {
          console.log(res)
          if (role === 'student') {
            this.loadStudents()
          }
          if (role === 'trainer') {
            this.loadTrainers()
          }
        },
        (err) => {
          this.toast.error('DATABASE ERROR')
        }

      )
    }
    catch (error) {
      return this.toast.error('SERVER ERROR')
    }
  }

  navToReg() {
    this.router.navigate(['student-reg'])
  }

  submit() {
    const formValue = this.addCourseForm.value;
    console.log(formValue);


    const apiUrl = `http://localhost:3000/api/new-course/`;

    this.http.post(apiUrl, formValue)
      .subscribe(response => {
        console.log('API Response:', response);
      }, error => {
        console.error('API Error:', error);
      });

  }
}

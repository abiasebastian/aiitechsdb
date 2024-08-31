import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentLoginComponent } from './student-login/student-login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddAndEditStudentsComponent } from './add-and-edit-students/add-and-edit-students.component';
import { Pipe1Pipe } from './pipe1.pipe';
import { AddAndEditTrainersComponent } from './add-and-edit-trainers/add-and-edit-trainers.component';
import { AddAndEditCoursesComponent } from './add-and-edit-courses/add-and-edit-courses.component';
import { TrainerLoginComponent } from './trainer-login/trainer-login.component';
import { HomePageComponent } from './home-page/home-page.component';





@NgModule({
  declarations: [
    AppComponent,
    StudentLoginComponent,
    ProfileComponent,
    AdminDashboardComponent,
    AddAndEditStudentsComponent,
    Pipe1Pipe,
    AddAndEditTrainersComponent,
    AddAndEditCoursesComponent,
    TrainerLoginComponent,
    HomePageComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
 ],
  providers: [ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

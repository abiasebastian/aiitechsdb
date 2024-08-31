import { NgModule } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";
import { AddAndEditStudentsComponent } from './add-and-edit-students/add-and-edit-students.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { guardGuard } from './guard/guard.guard';
import { adminGuard } from './admin.guard';
import { AddAndEditTrainersComponent } from './add-and-edit-trainers/add-and-edit-trainers.component';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [

  { path: 'student-reg', component: AddAndEditStudentsComponent, canActivate: [adminGuard] },
  { path: '', component: HomePageComponent },
  { path: 'trainer-reg', component: AddAndEditTrainersComponent },
  { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [guardGuard] },
  { path: 'student-edit', component: AddAndEditStudentsComponent, canActivate: [adminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

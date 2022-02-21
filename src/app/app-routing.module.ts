import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddRoomComponent } from './admin/add-room/add-room.component';
import { HomeComponent } from './users-page/home/home.component';
import { LoginComponent } from './users-page/login/login.component';
import { SignupComponent } from './users-page/signup/signup.component';
import { AppointmentComponent } from './users-page/appointment/appointment.component';
import { UserGaurdGuard } from './users-page/guard/user-guard.guard';
import { AdminGuard } from './admin/authguard/admin.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AddRoomComponent } from './admin/add-room/add-room.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'  //this means if the path is blank then it redirect to login page
  },

  {
    path: 'adminlogin', component: AdminLoginComponent
  },
  {
    path: 'dashboard', component: AdminComponent, canActivate: [AdminGuard]
  },

  {
    path: "dashboard", loadChildren: () => import('./admin/admins-routing.module')
      .then(m => m.AdminsRoutingModule), canActivate: [AdminGuard]
  },
  {
    path: 'addroom', component: AddRoomComponent, canActivate: [AdminGuard]
  },

  //This are the route of users
  {
    path: 'appointment', component: AppointmentComponent, canActivate: [UserGaurdGuard]
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent //User login route
  },
  {
    path: "home", loadChildren: () => import('./users-page/users/users.module')
      .then(m => m.UsersModule), canActivate: [UserGaurdGuard]
  }

  //   path:"h",
  //   loadChildren:() => import("./modules/public/public.module").then(m=>m.PublicModule) //Lazy loading
  // },
  // {
  //   path:"dashboard",
  //   loadChildren:() => import("./modules/dashboard/dashboard.module").then(m=>m.DashboardModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

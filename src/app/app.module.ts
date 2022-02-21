import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Importing form module and rective module to use the form

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users-page/login/login.component';
import { SignupComponent } from './users-page/signup/signup.component';
import { HomeComponent } from './users-page/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './users-page/User-navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddRoomComponent } from './admin/add-room/add-room.component';
import { AppointmentComponent } from './users-page/appointment/appointment.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    DashboardComponent,
    AddRoomComponent,
    AppointmentComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // Importing the reactive form module to use the reactive form 
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [AppointmentComponent,HomeComponent,AdminLoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

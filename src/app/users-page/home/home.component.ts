import { Component, OnInit } from '@angular/core';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Appointment } from '../appointmentModel/appointment.model';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appointmentData!: any;
  appointmentObj: Appointment = new Appointment();
  filterText: any;

  constructor(private api: ApiService, private appointment: AppointmentComponent, private router: Router) { }

  ngOnInit(): void {
    this.displayAllAppointmentData();
  }

  displayAllAppointmentData() {
    this.api.getAllAppointments()
      .subscribe(res => {
        this.appointmentData = res;
      })
  }
}

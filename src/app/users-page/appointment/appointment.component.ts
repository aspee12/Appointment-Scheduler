import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Room } from 'src/app/admin/models/room.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointmentModel/appointment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointmentValue!: FormGroup;
  appointmentData!: any;
  getAppointments: any;

  submitAppointmentButton!: boolean;
  updateAppointmentButton!: boolean;

  appointmentObj = new Appointment();
  updateappointmentObj = new Appointment();
  roomObj: Room = new Room();

  userDetails: any;
  user_id: any;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.appointmentValue = this.formBuilder.group({
      appointmentName: ['', Validators.required],
      roomName: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      comments: ['', Validators.required],
    });

    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.user_id = this.userDetails.id;
    // console.log('name', this.user_id);

    this.displayAllAppointments();
    this.displayRoomDetials();
  }
  displayRoomDetials() {
    this.api.getRoomDetails().subscribe((res) => {
      this.appointmentData = res;
      // console.log(this.appointmentData);
    });
  }

  displayAllAppointments() {
    //to fetch all the appointment data created earlier
    this.api.getAllAppointments().subscribe((res) => {
      this.getAppointments = res;
      // console.log("inside appoint");
      // console.log(this.getAppointments);
    });
  }

  makeNewAppointment() {
    this.appointmentValue.reset();
    this.submitAppointmentButton = true;
    this.updateAppointmentButton = false;
  }

  result: any;
  createAppointments() {
    this.appointmentObj.appointmentName =
      this.appointmentValue.value.appointmentName;
    this.appointmentObj.roomName = this.appointmentValue.value.roomName; //pointing from other component
    this.appointmentObj.date = this.appointmentValue.value.date;
    this.appointmentObj.start_time = this.appointmentValue.value.start_time;
    this.appointmentObj.end_time = this.appointmentValue.value.end_time;
    this.appointmentObj.comments = this.appointmentValue.value.comments;
    this.appointmentObj.createBy = this.user_id;
    // this.appointmentObj.createBy = this.appointmentValue.value.userName;
    // console.log(this.appointmentValue.value.date, 'date', this.appointmentValue.value.start_time, 'time', this.appointmentValue.value.end_time)
    this.api
      .getDuplicationAppointments(
        this.appointmentValue.value.roomName,
        this.appointmentValue.value.date,
        this.appointmentValue.value.start_time,
        this.appointmentValue.value.end_time
      )
      .subscribe((res) => {
        if (res.length == 0) {
          // alert(res.length + "if")
          this.api.saveAppointments(this.appointmentObj).subscribe((res) => {
            // console.log(res);
            // console.log("Id here")

            console.log('cretedby', this.appointmentObj.createBy);
            alert('Appointment create successful');
            this.displayAllAppointments();
          });
        } else {
          alert('Appointment was Already Booked');
        }
      });
  }

  //This function is for button

  //Edit appointment
  editAppointments(row: any) {
    this.submitAppointmentButton = false;
    this.updateAppointmentButton = true;

    console.log(this.submitAppointmentButton);
    this.appointmentObj = row.id;
    this.appointmentValue.controls['appointmentName'].setValue(
      row.appointmentName
    );
    this.appointmentValue.controls['roomName'].setValue(row.roomName);
    // this.appointmentValue.controls['roomNo'].setValue(row.roomNo);
    this.appointmentValue.controls['date'].setValue(row.date);
    this.appointmentValue.controls['start_time'].setValue(row.start_time);
    this.appointmentValue.controls['end_time'].setValue(row.end_time);
    this.appointmentValue.controls['comments'].setValue(row.comments);
  }

  removeAppointments(data: any) {
    this.api.deleteAppointments(data.id).subscribe((res) => {
      alert('Appointment Deleted Successfully');
      // this.getAllAppointmentData;
      this.displayAllAppointments();
    });
  }

  updateAppointmentDetails() {
    console.log('insid update');
    console.log(this.appointmentValue.value.appointmentName);

    this.updateappointmentObj.appointmentName =
      this.appointmentValue.value.appointmentName;
    this.updateappointmentObj.roomName = this.appointmentValue.value.roomName;
    this.updateappointmentObj.date = this.appointmentValue.value.date;
    this.updateappointmentObj.start_time =
      this.appointmentValue.value.start_time;
    this.updateappointmentObj.end_time = this.appointmentValue.value.end_time;
    this.updateappointmentObj.comments = this.appointmentValue.value.comments;
    this.updateappointmentObj.createBy = this.user_id;
    
    console.log(this.appointmentObj, 'results');

    this.api
      .updateAppointments(this.appointmentObj, this.updateappointmentObj)
      .subscribe((res) => {
        alert('Update data Successfully');
        this.appointmentValue.reset();
        this.updateappointmentObj.id = 0;
        this.displayAllAppointments();
      });
    console.log('Update');
  }
}

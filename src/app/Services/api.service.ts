import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  isApprove: boolean = false



  getUsers(data: any) {
    return this.http.get<any>('http://localhost:3000/Users', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getUrl = ""
  getIndividualUsers(email: any) {
    this.getUrl = 'http://localhost:3000/Users?email=' + email
    return this.http.get<any>(this.getUrl)
      .pipe(map((res: any) => {
        // console.log(res)
        return res;
      }))
  }

  deleteUsers(id: number) {
    return this.http.delete<any>("http://localhost:3000/Users/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  public signupForm !: FormGroup;
  updateUser(user: any) {

    this.signupForm = this.formBuilder.group({
      fullname: [user.fullname], //declaring empty variable to store the data of user 
      email: [user.email], //thsi word must same in the form which define as name attributes
      phone: [user.phone],
      password: [user.password],
      isApprove: [true]
    })
    return this.http.put<any>("http://localhost:3000/Users/" + user.id, this.signupForm.value)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  url = 'http://localhost:3000/Users';
  navUser() {
    return this.http.get(this.url);
  }


  // room api services for admin

  getAllRooms() {
    return this.http.get<any>("http://localhost:3000/roomlist")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  uploadRooms(data: any) {
    return this.http.post<any>("http://localhost:3000/roomlist", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //Update room

  updateRoom(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/roomlist/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  // Delete Method for Room

  deleteRoom(id: number) {
    return this.http.delete<any>("http://localhost:3000/roomlist/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //Following are the Api Services of appointment

  //First is GET Method 

  getAllAppointments() {
    return this.http.get<any>("http://localhost:3000/appointment")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  getRoomDetails() {
    return this.http.get<any>("http://localhost:3000/roomlist")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  saveAppointments(data: any) {
    return this.http.post<any>("http://localhost:3000/appointment", data) // for the post we mention what we are going to post
      .pipe(map((req: any) => {
        return req;
      }))
  }

  //Now setting up the update data with PUT Method

  updateAppointments(id: any, data: any) {      //to update we have to mention id to update particular field
    return this.http.put<any>("http://localhost:3000/appointment/" + id, data) //+id means updating with id 
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //Now to delete data with DELETE Http method

  deleteAppointments(id: number) { //to delete single item we have to mention id 
    return this.http.delete<any>("http://localhost:3000/appointment/" + id)
      .pipe(map((req: any) => {
        return req;
      }))
  }

  getAdminCridential() {
    return this.http.get<any>("http://localhost:3000/adminCredential")
      .pipe(map((req: any) => {
        return req;
      }))
  }

  //For appointment with geting single data

  getSingleDate(date: any) {
    return this.http.get<any>('//http://localhost:3000/appointment?date=' + date)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getDuplicationAppointments(roomName: any, date: any, start_time: any, end_time: any) {
    return this.http.get<any>("http://localhost:3000/appointment?roomName=" + roomName + "&date=" + date + "&start_date=" + start_time + "&end_time=" + end_time)
      .pipe(map((req: any) => {
        return req;
      }))
  }
  getSingleEndTime(end_time: any) {
    return this.http.get<any>('//http://localhost:3000/appointment?end_time=' + end_time)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}

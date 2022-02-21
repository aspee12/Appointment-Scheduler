import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  roomValue!: FormGroup;
  roomData!: any;
  roomObj: Room = new Room();
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.roomValue = this.formBuilder.group({
      roomName: ['', Validators.required],
      // roomNo: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.displayAllRoom();
  }

  addNewRoom() {
    this.roomValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

  createRooms() {
    this.roomObj.roomName = this.roomValue.value.roomName;
    // this.roomObj.roomNo = this.roomValue.value.roomNo;
    this.roomObj.description = this.roomValue.value.description;

    this.api.uploadRooms(this.roomObj)
      .subscribe(res => {
        console.log(res);
        alert('Room Added Successfull')
        this.roomValue.reset();
        this.displayAllRoom();

      },
        error => {
          alert('Opps Something went wrong');
        })

  }

  displayAllRoom() {
    this.api.getAllRooms()
      .subscribe(res => {
        this.roomData = res;
      })
  }

  editRooms(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.roomObj.id = data.id;
    this.roomValue.controls['roomName'].setValue(data.roomName);
    // this.roomValue.controls['roomNo'].setValue(data.roomNo);
    this.roomValue.controls['description'].setValue(data.description);
  }

  removeRooms(data: any) {
    this.api.deleteRoom(data.id)
      .subscribe(res => {
        alert('Room Deleted Successful')
        let ref = document.getElementById('cancel');
        ref?.click();
        this.displayAllRoom();
      })
  }

  updateSaveRooms() {
    this.roomObj.roomName = this.roomValue.value.roomName;
    // this.roomObj.roomNo = this.roomValue.value.roomNo;
    this.roomObj.description = this.roomValue.value.description;

    this.api.updateRoom(this.roomObj, this.roomObj.id)
      .subscribe(res => {
        alert('Update Successfully');
        this.roomValue.reset();
        this.displayAllRoom();
      })

  }

}

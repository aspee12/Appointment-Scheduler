import { Time } from "@angular/common";

export class Appointment {
    id: number;
    appointmentName: string;
    date: any;
    start_time: Time;
    end_time: Time;
    comments: string;
    roomName: string;
    createBy : any;
}


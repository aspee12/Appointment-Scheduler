import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  adminDetails: any;
  adminName: any;

  constructor(private router: Router, private adminC: AdminLoginComponent) { }

  ngOnInit(): void {
    // this.userDisplayName = sessionStorage.getItem('admin');

    this.adminDetails = JSON.parse(localStorage.getItem('admin'));
    this.adminName = this.adminDetails.username;
  }

  logOut() {
    alert("Logout successful")
    localStorage.removeItem('admin');
    this.router.navigate(['login']);
  }

}

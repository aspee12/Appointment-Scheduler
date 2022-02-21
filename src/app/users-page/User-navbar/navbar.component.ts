import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users: any;
  userName: any;

  usersDetails: any;
  usersName: any;
  public loginForm !: FormGroup;
  constructor(private api: ApiService, private router: Router) {
    this.api.navUser().subscribe((res) => {
      this.users = res;
    })

  }

  ngOnInit(): void {
    this.usersDetails = JSON.parse(localStorage.getItem('user'));
    this.usersName = this.usersDetails.fullname;
  }

  logoutUser() {
    window.alert('Logout Successfull')
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}

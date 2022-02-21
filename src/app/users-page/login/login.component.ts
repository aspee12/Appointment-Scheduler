import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
// import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: [],
      isApprove: [false],
      email: ['', [Validators.required, Validators.pattern('^[0-9a-z_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]],
    })
  }
  login() {
    this.http.get<any>("http://localhost:3000/Users")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.loginForm.reset();
          if (user.isApprove) {
            alert('Login Succesfull!!!')
            this.route.navigate(['home'])

          } else {
            alert("You are not approved by admin");
          }
        }
        else {
          alert("User Failed to Login")
        }
      }, err => {
        alert("Opps something went wrong!")
      })


  }
  get email() { return this.loginForm.get('email') } // This is form validation in order to use particular field name
}

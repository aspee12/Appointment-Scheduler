import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm!: FormGroup
  constructor(private formBulilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBulilder.group({
      id: [],
      // username: [''],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  adminLogin() {
    this.api.getAdminCridential()
      .subscribe(res => {
        const admin = res.find((i: any) => {
          return i.email === this.adminLoginForm.value.email
            && i.password === this.adminLoginForm.value.password
        });
        if (admin) {
          localStorage.setItem('admin', JSON.stringify(admin));
          // console.log(localStorage.setItem('admin', JSON.stringify(admin.username)))
          // sessionStorage.setItem('admin', admin.username);
          alert("Admin Login Successfull");
          this.adminLoginForm.reset();
          this.route.navigate(['/dashboard'])
        }
        else {
          alert("Admin Not Found!")
        }
      }, error => {
        alert("Opps! Something went wrong")
      })
  }

}

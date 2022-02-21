import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../Services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup; //declaring signup form as an public
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {  //declaring formbuilder as a private
    //when we call the post of sighUp() so we must inject the http client and must import in the module
  }

  ngOnInit(): void {
    //now we are storing the signup form data with the help of formbuilder
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]], //declaring empty variable to store the data of user 
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9_%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]], //thsi word must same in the form which define as name attributes
      phone: ['', [Validators.required, Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]],
      isApprove: [false]
    })
  }
  signUp() {
    // console.log(this.email?.value,'this is the email')
    this.api.getIndividualUsers(this.email?.value).subscribe(res => {
      if (res.length == 0) {
        this.http.post<any>("http://localhost:3000/Users", this.signupForm.value)
          .subscribe(res => {
            alert("Rigster Susscussfull");
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
            err => {
              alert("Opps! Somthing went Wrong!")
            })
      }
      else {
        alert("Email already Exists")
      }
    })
 
  }


  get fullname() { return this.signupForm.get('fullname'); } //For validation form

  get email() { return this.signupForm.get('email') }

}

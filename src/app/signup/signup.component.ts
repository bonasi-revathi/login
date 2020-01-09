import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  SigninForm: FormGroup;
  constructor(private authservice:AuthService,private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.SigninForm = this.fb.group({
      fname: ['',Validators.required],
      lname: ['', Validators.required],
      Email:['', [Validators.required,Validators.email]]
    })
  }

  get f() {
    return this.SigninForm.controls;
  }

    async onSubmit(form) {
    this.submitted = true;
    if (this.SigninForm.invalid){
      console.log('form is valid');
      return;
    } else {
    console.log(this.SigninForm.value);
    let status: any
    status = await this.authservice.Enrolldetails(this.SigninForm.value);
    console.log(status.data);
    if (status) {
      console.log('hello');
      localStorage.setItem('user',JSON.stringify(status.data));
      this.authservice.logincount = false;
      this.router.navigate(['/home']);
     }
  }

  }

}

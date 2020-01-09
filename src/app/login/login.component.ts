import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

import { MymodalComponent } from '../mymodal/mymodal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  Incorrect: boolean;

  constructor(private fb: FormBuilder, private authservice: AuthService,private router:Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  async onSubmit(form) {
    console.log(form.value);
    let loginres: any;
    loginres = await this.authservice.loginuser(form.value);
    console.log(loginres);
    if (loginres.status == 200) {
      localStorage.setItem('user', JSON.stringify(loginres.data));
      localStorage.setItem('authtoken', loginres.authtoken );
      this.authservice.logincount = true;
      this.router.navigate(['/home']);
    } else if (loginres.status ==  409) {
      this.router.navigate(['/signup']);
    } else if (loginres.status == 406){
        this.Incorrect = true;
    }
  }

}

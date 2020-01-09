import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   url = 'http://localhost:3002/userdetails/';
   user:any;
   logincount:any;
  constructor(private http: HttpClient) { }
getuser() {
  this.user = JSON.parse(localStorage.getItem('user'));
  console.log('user', this.user.Email);
  return this.user.Email;
}
  Enrolldetails(params) {
    const enroldata = new Promise(( resolve, reject ) => {
      this.http.post(this.url, params).toPromise().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        console.log('posted data successfully');
      });
    });
    return enroldata;
  }

  loginuser(params) {
    const loginuser = new Promise((resolve, reject) => {
      this.http.post(this.url + 'userlogin',params).toPromise().then((res) => {
        resolve(res);
      }).catch((err)=> {
        reject(err);
      }).finally(()=> {
        console.log('user login successfully');
      })
    })
    return loginuser;
  }
  updatepassword(params) {
    const updatepass = new Promise((resolve,reject) => {
      this.http.post(this.url + 'passwordupdate',params).toPromise().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      }).finally(() => {
        console.log('updated password successfully');
      })
    })
    return updatepass;
  }

  getToken() {
    return localStorage.getItem('authtoken').replace(/^"(.*)"$/, '$1') ;
  }
}

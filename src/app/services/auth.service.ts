import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl = 'http://54.254.242.160:5112/admin/v1/users/login';
  checkToken: any;
  checkPass: any;
  checkUser: any;
  loginCheck: any;
  checkLoginToken: any;

  constructor(private http: HttpClient) {
  }

  ProceedLogin(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.checkToken = data;
    sessionStorage.setItem('userToken', btoa(JSON.stringify(this.checkToken)));
    return this.http.post(this.apiurl, data, { headers });
  }
  IsLoggedIn() {
    this.checkUser = sessionStorage.getItem('userID')
    this.checkPass = atob(this.checkUser);
    const checkLogin = sessionStorage.getItem('userToken')
    if (checkLogin) {
      this.loginCheck = atob(sessionStorage.getItem('userToken')!)
      this.checkLoginToken = JSON.parse(this.loginCheck);
    }
    else {
      this.checkLoginToken = ' ';
    }
    return this.checkPass === this.checkLoginToken;
  }
}

import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {Login} from "../../models/login";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : User = {
    id: 0
  }

  constructor(private router: Router, private http: HttpClient) {
    console.log("auth construct: " + Date.now());
  }

  authLogin(loginForm: Login) {
    return this.http.get<number>('https://крымскаяягода.рус:443/api/auth/getId' + '?email=' + loginForm.email + '&pass=' + loginForm.pass);
  }

  loginUser(userId: number) {
    // ADD LOGIN
    localStorage.setItem('userId', userId.toString());
    this.router.navigate(["/entries"]).then(() => {window.location.reload()});
  }

  logoutUser() {
    localStorage.setItem("userId", "0");
    this.router.navigate(["/entries"]).then(() => {window.location.reload()});
  }

  isLoggedIn() : boolean {
    return (this.getLocalId() > 0)
  }

  getLocalId() : number {
    return Number(localStorage.getItem("userId"));
  }

  getUser() {
    if (this.isLoggedIn()) {
      return this.http.get<User>('https://крымскаяягода.рус:443/api/user/id/' + this.getLocalId());
    }
    return;
  }

  addUser(user: User) {
    return this.http.post<User>('https://крымскаяягода.рус:443/api/user/add', user);
  }

  addLogin(login: Login){
    return this.http.post<Login>('https://крымскаяягода.рус:443/api/auth/add', login);
  }

  updateUser(user: User) {
    return this.http.put<User>("https://крымскаяягода.рус:443/api/user/update", user);
  }

  updateLogin(login: Login) {
    login.userId = this.getLocalId();
    console.log(login);
    return this.http.put<number>("https://крымскаяягода.рус:443/api/auth/update", login);
  }

}

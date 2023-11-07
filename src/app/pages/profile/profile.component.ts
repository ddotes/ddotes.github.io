import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User = new User();
  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    this.authService.getUser()?.subscribe(result => {
      this.user = new User(result);
    });
  }

  logOut() {
    console.log("LOG OUT");
    this.authService.logoutUser();
  }


}

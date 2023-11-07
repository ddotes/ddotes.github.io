import { Component } from '@angular/core';
import {FormControl} from '@angular/forms'
import {User} from "../../models/user";
import {popupErrorMsg, ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";
import {AuthService} from "../../auth/services/auth.service";
import {Login} from "../../models/login";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {default as _rollupMoment} from "moment/moment";
import _moment from "moment/moment";


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  popupErrorMsg: popupErrorMsg;
  user: User = new User();
  login: Login = new Login();
  // cPassForm: NgModel;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  date = new FormControl(moment());
  maxDate: Date;

  constructor(private authService: AuthService, private validationErrorPopupService: ValidationErrorPopupService, private router: Router, private snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver) {
    this.popupErrorMsg = validationErrorPopupService.popupErrorMsg;
    this.maxDate = new Date();
    this.user.birthday = this.maxDate;
  }

  ngOnInit() {
    const usernameErrorIcon = document.querySelector<HTMLElement>('#usernameErrorIcon');
    const emailErrorIcon = document.querySelector<HTMLElement>('#emailErrorIcon');
    const passErrorIcon = document.querySelector<HTMLElement>('#passErrorIcon');
    const cPassErrorIcon = document.querySelector<HTMLElement>('#cPassErrorIcon');
    const popup = document.querySelector<HTMLElement>('#errorPopup');


    if (!usernameErrorIcon || !emailErrorIcon || !passErrorIcon || !cPassErrorIcon || !popup) return;
    this.validationErrorPopupService.initErrorPopup(usernameErrorIcon, popup, "Username cannot be empty");
    this.validationErrorPopupService.initErrorPopup(emailErrorIcon, popup, "Email cannot be empty");
    this.validationErrorPopupService.initErrorPopup(passErrorIcon, popup, "Pass cannot be empty");
    this.validationErrorPopupService.initErrorPopup(cPassErrorIcon, popup, "Passwords do not match");
  }

  registerUser() : void {
    this.user.pfpLink = "https://osu.ppy.sh/images/layout/avatar-guest@2x.png";
    this.authService.addUser(this.user).subscribe({
      next: (user: User) => {
        this.login.userId = user.id;
        if(user.email) this.login.email = user.email;
        this.authService.addLogin(this.login).subscribe( {
          next: () => {
            this.authService.authLogin(this.login).subscribe({
              next: (userId: number) => {
                this.authService.loginUser(userId);
                },
              error: (e) => {
                this.openSnackBarError(e.error.message, "Ok")
              }
            });
          },
          error: (e) => {
            this.openSnackBarError(e.error.message, "Ok")
          }
        })
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok")
      }
    });
  }

  goToLogin() : void {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }

  openSnackBarError(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['redbg']
    });
  }

}

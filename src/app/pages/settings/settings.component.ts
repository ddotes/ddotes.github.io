import { Component } from '@angular/core';
import {User} from "../../models/user";
import {AuthService} from "../../auth/services/auth.service";
import {Login} from "../../models/login";
import {MatSnackBar} from "@angular/material/snack-bar";
import {popupErrorMsg, ValidationErrorPopupService} from "../../ui/services/validation-error-popup.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  oldUser: User = new User();
  newUser: User = new User();
  login: Login = new Login();

  edit : string = 'none';
  hiddenOptions: string[] = ['Private', 'Public'];
  popupErrorMsg: popupErrorMsg;
  cPassInput: HTMLInputElement | null = null;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private validationErrorPopupService: ValidationErrorPopupService) {
    this.popupErrorMsg = validationErrorPopupService.popupErrorMsg;
  }

  ngOnInit() {
    const cPassErrorIcon = document.querySelector<HTMLElement>('#cPassErrorIcon');
    this.cPassInput = document.querySelector<HTMLInputElement>('#cPassInput');
    const popup = document.querySelector<HTMLElement>('#errorPopup');
    if (!cPassErrorIcon || !popup) return;
    this.validationErrorPopupService.initErrorPopup(cPassErrorIcon, popup, "Passwords do not match");

    this.authService.getUser()?.subscribe(result => {
      this.oldUser = new User(result);
      this.newUser = new User(result);
    });
  }

  editMode(edit: string) {
    this.newUser = new User(this.oldUser);
    this.edit = edit;
  }

  cancelEditing() {
    this.newUser = new User(this.oldUser);
    this.login = new Login();
    this.edit='none';
    if(this.cPassInput){
      this.cPassInput.value = '';
    }
  }

  onFileSelect(input: any) {
    console.log(input.files[0].name);
    if (!input.files && !input.files[0]) {
      return;
    }
    if (!input.files[0].name.endsWith(".png") && !input.files[0].name.endsWith(".jpg")) {
      this.openSnackBarError("Only png or jpg files are valid", "Ok");
      return;
    }
    let reader = new FileReader();
    reader.onload = (e: any) => {
      // let type: string = e.target.result.split(';')[0];
      // let base64: string = e.target.result.split(';')[1];
      console.log(e.target.result);
      this.newUser.pfpLink = e.target.result;
      this.authService.updateUser(this.newUser).subscribe( {
        next: (result) => {
          this.oldUser = new User(result);
          this.newUser = new User(result);
          this.edit = 'none';
          this.openSnackBarSuccess("Profile picture changed", "Ok")
        },
        error: (e) => {
          this.openSnackBarError(e.error.message, "Ok");
        }
      });

    }
    reader.readAsDataURL(input.files[0]);
  }

  // updatePfp() {
  //   this.authService.updateUser(this.newUser).subscribe( {
  //     next: (result) => {
  //       this.oldUser = new User(result);
  //       this.newUser = new User(result);
  //       this.edit = 'none';
  //       this.openSnackBarSuccess("Profile picture changed", "Ok")
  //     },
  //     error: (e) => {
  //       this.openSnackBarError(e.error.message, "Ok");
  //     }
  //   });
  // }

  updateEmail() {
    this.authService.updateUser(this.newUser).subscribe( {
      next: (result) => {
        if (this.newUser.email != null){
          this.login.email = this.newUser.email;
          console.log(this.login);
          this.authService.updateLogin(this.login).subscribe({
            next: (resultLogin) => {
              this.oldUser = new User(result);
              this.newUser = new User(result);
              this.login = new Login();
              this.edit = 'none';
              this.openSnackBarSuccess("Email changed", "Ok")
            },
            error: (e) => {
              this.openSnackBarError(e.error.message, "Ok");
            }
          });
        }
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
      }
    });
  }

  updateUsername() {
    this.authService.updateUser(this.newUser).subscribe( {
      next: (result) => {
        this.oldUser = new User(result);
        this.newUser = new User(result);
        this.edit = 'none';
        this.openSnackBarSuccess("Username changed", "Ok")
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
    }
    });

  }

  updatePassword() {
    this.authService.updateLogin(this.login).subscribe({
      next: (result) => {
        this.login = new Login();
        if(this.cPassInput){
          this.cPassInput.value = '';
        }
        this.edit = 'none';
        this.openSnackBarSuccess("Password changed", "Ok")
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
      }
    });

  }

  updateHiddenStatus() {
    this.authService.updateUser(this.newUser).subscribe( {
      next: (result) => {
        this.oldUser = new User(result);
        this.newUser = new User(result);
        this.edit = 'none';
      },
      error: (e) => {
        this.openSnackBarError(e.error.message, "Ok");
      }
    });
  }

  openSnackBarError(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['redbg']
    });
  }

  openSnackBarSuccess(message: string, action: string) : void {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: ['greenbg']
    });
  }
}

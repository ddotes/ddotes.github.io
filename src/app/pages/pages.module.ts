import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CollectionsComponent } from './collections/collections.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {MY_FORMATS, RegisterComponent} from './register/register.component';
import { AppRoutingModule } from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import { SettingsComponent } from './settings/settings.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryComponent } from './entries/entry/entry.component';
import { AboutComponent } from './about/about.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';





@NgModule({
  declarations: [
    HomeComponent,
    CollectionsComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    SettingsComponent,
    EntriesComponent,
    EntryComponent,
    AboutComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        MatSnackBarModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
    ]
})
export class PagesModule { }


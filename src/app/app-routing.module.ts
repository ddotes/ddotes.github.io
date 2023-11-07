import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { CollectionsComponent } from "./pages/collections/collections.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {RegisterComponent} from "./pages/register/register.component";
import {authGuard} from "./auth/guards/auth.guard";
import {userGuard} from "./auth/guards/user.guard";
import {SettingsComponent} from "./pages/settings/settings.component";
import {EntriesComponent} from "./pages/entries/entries.component";
import {AboutComponent} from "./pages/about/about.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [userGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'collections',
    component: CollectionsComponent,
    canActivate: [userGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [userGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [userGuard]
  },
  {
    path: 'entries',
    component: EntriesComponent,
    canActivate: [userGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

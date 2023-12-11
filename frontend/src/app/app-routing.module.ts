import { NgModule, signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MyProfilePopupComponent } from './components/my-profile-popup/my-profile-popup.component';
import { MessagingComponent } from './components/messaging/messaging.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: ""},
  {path:'', component:HomeComponent},

  {path:'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'my-profile-popup', component:MyProfilePopupComponent},
  {path:'edit-profile', component:EditProfileComponent},
  {path:'messaging', component:MessagingComponent},
  {path:'forgot-password', component:ForgotPasswordComponent}

  // {path: "**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

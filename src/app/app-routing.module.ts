import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {SearchedGifsComponent} from "./searched-gifs/searched-gifs.component";
import {GifComponent} from "./gif/gif.component";
import {AboutUsComponent} from './about-us/about-us.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: 'gif/:gifId', component: GifComponent},
  {path: 'gif/search/:searchTerm', component: SearchedGifsComponent},
  {path: 'team', component: AboutUsComponent},
  {path: 'gif/:gifId', component: GifComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', pathMatch: "full", component: LoginComponent},
  {path: '**', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

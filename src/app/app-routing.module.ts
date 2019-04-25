import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {SearchedGifsComponent} from "./searched-gifs/searched-gifs.component";
import {GifComponent} from "./gif/gif.component";
import {AboutUsComponent} from './about-us/about-us.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {UploadComponent} from './upload/upload.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';
import {NewsFeedComponent} from './news-feed/news-feed.component';
import {AdminUserPageComponent} from './admin-user-page/admin-user-page.component';
import {AdminEditUserComponent} from './admin-edit-user/admin-edit-user.component';
import {AdminCreateUserComponent} from './admin-create-user/admin-create-user.component';
import {ResetpasswordComponent} from './reset-password/resetpassword.component';


const routes: Routes = [
  {path: 'admin-user-page' , component: AdminUserPageComponent},
  {path: 'admin/edit-user/:userId', component: AdminEditUserComponent},
  {path: 'admin/create-user', component: AdminCreateUserComponent},
  {path: 'gif/:gifId', component: GifComponent},
  {path: 'newsfeed', component: NewsFeedComponent},
  {path: 'gif/search/:searchTerm', component: SearchedGifsComponent},
  {path: 'team', component: AboutUsComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'gif/:gifId', component: GifComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password/reset', component: ResetpasswordComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'user/:userName', pathMatch: 'full', component: UserListComponent},
  {path: 'search/user/:userId', pathMatch: 'full', component: UserComponent},
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: '**', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchedGifsComponent } from './searched-gifs/searched-gifs.component';
import {FormsModule} from "@angular/forms";
import { GifComponent } from './gif/gif.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import {CookieService} from 'ngx-cookie-service';
import { UploadComponent } from './upload/upload.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { AdminUserPageComponent } from './admin-user-page/admin-user-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminCreateUserComponent } from './admin-create-user/admin-create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    SearchedGifsComponent,
    GifComponent,
    AboutUsComponent,
    ProfileComponent,
    UploadComponent,
    UserListComponent,
    UserComponent,
    NewsFeedComponent,
    AdminUserPageComponent,
    AdminEditUserComponent,
    AdminCreateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

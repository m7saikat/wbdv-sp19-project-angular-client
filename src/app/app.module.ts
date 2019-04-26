import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchedGifsComponent } from './searched-gifs/searched-gifs.component';
import {FormsModule} from '@angular/forms';
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
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { ResetpasswordComponent } from './reset-password/resetpassword.component';
import { UserUploadGifComponent } from './user-upload-gif/user-upload-gif.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

// const googleLoginOptions: LoginOpt = {
//   scope: 'profile email'
// };

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('950601830079-k48proe2ml618ce918k5it6uo15ib0dq.apps.googleusercontent.com')
  }]);

export function provideConfig() {
  return config;
}
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
    AdminCreateUserComponent,
    ResetpasswordComponent,
    UserUploadGifComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [CookieService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

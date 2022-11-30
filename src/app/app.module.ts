import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { CookieService } from 'ngx-cookie-service';
import { IndividualMessageComponent } from './components/individual-message/individual-message.component';
import { IndividualProfileComponent } from './components/individual-profile/individual-profile.component';
import { EditThreadComponent } from './components/edit-thread/edit-thread.component';
import { CreateThreadComponent } from './components/create-thread/create-thread.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    DashboardComponent,
    SignupComponent,
    IndividualMessageComponent,
    IndividualProfileComponent,
    EditThreadComponent,
    CreateThreadComponent,
    EditProfileComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

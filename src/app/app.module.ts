import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { EmailverificationComponent } from './components/emailverification/emailverification.component';
import { AccountconfirmationComponent } from './components/accountconfirmation/accountconfirmation.component';
import {UsernameRecoveryComponent} from "./components/username-recovery/username-recovery.component";
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { PasswordEmailverifyComponent } from './components/password-emailverify/password-emailverify.component';
import { MyCardComponent } from './components/my-card/my-card.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsernameRecoveryComponent,
    PasswordRecoveryComponent,
    EmailverificationComponent,
    AccountconfirmationComponent,
    NewpasswordComponent,
    PasswordEmailverifyComponent,
    MyCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers:
    [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

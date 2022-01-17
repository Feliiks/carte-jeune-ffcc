import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CarteJeuneComponent } from './components/carte-jeune/carte-jeune.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { EmailverificationComponent } from './components/emailverification/emailverification.component';
import { AccountconfirmationComponent } from './components/accountconfirmation/accountconfirmation.component';
import {UsernameRecoveryComponent} from "./components/username-recovery/username-recovery.component";
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { PasswordEmailverifyComponent } from './components/password-emailverify/password-emailverify.component';
import { GetMyCardComponent } from './components/get-my-card/get-my-card.component';
import { EditMyCardComponent } from './components/edit-my-card/edit-my-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CarteJeuneComponent,
    LayoutComponent,
    UsernameRecoveryComponent,
    PasswordRecoveryComponent,
    EmailverificationComponent,
    AccountconfirmationComponent,
    NewpasswordComponent,
    PasswordEmailverifyComponent,
    GetMyCardComponent,
    EditMyCardComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

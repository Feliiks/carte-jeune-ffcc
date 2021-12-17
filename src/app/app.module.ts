import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CarteJeuneComponent } from './components/carte-jeune/carte-jeune.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CarteJeuneNumeriqueComponent } from './components/carte-jeune-numerique/carte-jeune-numerique.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmailRecoveryComponent } from './components/email-recovery/email-recovery.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { RegistrationsuccessfulComponent } from './components/accountconfirmation/registrationsuccessful.component';
import { EmailverificationComponent } from './components/emailverification/emailverification.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CarteJeuneComponent,
    LayoutComponent,
    CarteJeuneNumeriqueComponent,
    EmailRecoveryComponent,
    PasswordRecoveryComponent,
    RegistrationsuccessfulComponent,
    EmailverificationComponent,
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

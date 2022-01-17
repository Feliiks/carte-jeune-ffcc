import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CarteJeuneComponent} from "./components/carte-jeune/carte-jeune.component";
import {PasswordRecoveryComponent} from "./components/password-recovery/password-recovery.component";
import {EmailverificationComponent} from "./components/emailverification/emailverification.component";
import {AccountconfirmationComponent} from "./components/accountconfirmation/accountconfirmation.component";
import {UsernameRecoveryComponent} from "./components/username-recovery/username-recovery.component";
import {NewpasswordComponent} from "./components/newpassword/newpassword.component";
import {PasswordEmailverifyComponent} from "./components/password-emailverify/password-emailverify.component";
import { GetMyCardComponent } from './components/get-my-card/get-my-card.component';
import { EditMyCardComponent } from './components/edit-my-card/edit-my-card.component';

const routes: Routes = [
  {path: '', component: CarteJeuneComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'account/emailverification/:email', component: EmailverificationComponent},
  {path: 'account/accountconfirmation/:token', component: AccountconfirmationComponent},

  {path: 'login', component: LoginComponent},

  {path: 'usernamerecovery', component: UsernameRecoveryComponent},

  {path: 'passwordrecovery', component: PasswordRecoveryComponent},
  {path: 'account/password/emailverify/:email', component: PasswordEmailverifyComponent},
  {path: 'account/passwordrecovery/newpassword/:token', component: NewpasswordComponent},

  {path: 'get-my-card', component: GetMyCardComponent},

  {path: 'edit-my-card', component: EditMyCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

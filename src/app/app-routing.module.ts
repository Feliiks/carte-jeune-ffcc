import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {PasswordRecoveryComponent} from "./components/password-recovery/password-recovery.component";
import {EmailverificationComponent} from "./components/emailverification/emailverification.component";
import {AccountconfirmationComponent} from "./components/accountconfirmation/accountconfirmation.component";
import {UsernameRecoveryComponent} from "./components/username-recovery/username-recovery.component";
import {NewpasswordComponent} from "./components/newpassword/newpassword.component";
import {PasswordEmailverifyComponent} from "./components/password-emailverify/password-emailverify.component";
import {MyCardComponent} from './components/my-card/my-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'inscription', component: RegisterComponent},
  {path: 'account/emailverification/:email', component: EmailverificationComponent},
  {path: 'account/accountconfirmation/:token', component: AccountconfirmationComponent},

  {path: 'connexion', component: LoginComponent},

  {path: 'usernamerecovery', component: UsernameRecoveryComponent},

  {path: 'passwordrecovery', component: PasswordRecoveryComponent},
  {path: 'account/password/emailverify/:email', component: PasswordEmailverifyComponent},
  {path: 'account/passwordrecovery/newpassword/:token', component: NewpasswordComponent},

  {path: 'macarte', component: MyCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

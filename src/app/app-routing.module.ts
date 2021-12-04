import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CarteJeuneComponent} from "./components/carte-jeune/carte-jeune.component";
import {CarteJeuneNumeriqueComponent} from "./components/carte-jeune-numerique/carte-jeune-numerique.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'carte-jeune', component: CarteJeuneComponent},
  {path: 'carte-jeune-numerique', component: CarteJeuneNumeriqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

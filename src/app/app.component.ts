import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {getUserSession, getYouthCardFromUser} from "./helpers/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cartejeuneffcc';
  user: any = null;
  sessionCookie: boolean = this.cookieService.check("sessionToken");

  constructor (
    private router: Router,
    private cookieService: CookieService
  ) { }

  async ngOnInit(): Promise<any> {
    // Récupération de la session de l'user
    try {
      if (!this.sessionCookie) throw new Error();
      let sessionToken = this.cookieService.get("sessionToken");

      this.user = await getUserSession(sessionToken);
    } catch {
      return null;
    }
  }

  logout = async () => {
    this.cookieService.delete("sessionToken");
    
    await this.router.navigate(['/']);
    location.reload();
  }

}

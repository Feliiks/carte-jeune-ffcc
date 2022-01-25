import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

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

      let res = await Axios.post("http://localhost:3009/user/session/get", { sessionToken: sessionToken });
      if (res.status !== 200) throw new Error();

      this.user = res.data;
    } catch {
      return this.user = null
    }
  }

  logout = async () => {
    this.cookieService.delete("sessionToken");
    await this.router.navigate(['/']);
    location.reload();
  }

}

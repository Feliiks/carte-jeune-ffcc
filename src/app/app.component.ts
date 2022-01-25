import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cartejeuneffcc';
  user: any = null;

  constructor (
    private router: Router
  ) { }

  async ngOnInit(): Promise<any> {
    let sessionToken = sessionStorage.getItem('sessionToken')

    try {
      if (sessionToken === null || sessionToken === undefined) throw new Error();

      let res = await Axios.post("http://localhost:3009/user/session/get", { sessionToken: sessionToken });

      if (res.status !== 200) throw new Error();

      this.user = res.data;
    } catch {
      return this.user = null
    }
  }

  logout = async () => {
    sessionStorage.removeItem('sessionToken')
    await this.router.navigate(['/']);
    location.reload();
  }

}

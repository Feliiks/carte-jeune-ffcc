import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from 'axios';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {getUserSession} from "../../helpers/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  sessionCookie: boolean = this.cookieService.check("sessionToken");

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  async ngOnInit(): Promise<any> {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ])
    })

    // Récupération de la session de l'user
    try {
      if (!this.sessionCookie) throw new Error();
      let sessionToken = this.cookieService.get("sessionToken");

      let res = await getUserSession(sessionToken);
      if (!res) throw new Error();

      await this.router.navigate(["/macarte"]);
    } catch {
      return null;
    }
  }

  public get f() { return this.loginForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { email, password } = this.f;

    if (!this.loginForm.invalid) {
      try {
        let res = await Axios.post("http://localhost:3009/login", {
          email: email.value,
          password: password.value
        });

        if (res.status !== 200) throw new Error()

        this.cookieService.set("sessionToken", res.data);
        await this.router.navigate(['/macarte']);
        location.reload();

      } catch (err) {
        this.f.email.setErrors({ accessDenied: true });
        this.f.password.setErrors({ accessDenied: true });
        console.error(err.message);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}

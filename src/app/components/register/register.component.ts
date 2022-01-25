import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import Axios from 'axios';
import { Router } from '@angular/router';
import { getUserSession } from "../../helpers/auth";

import Validation from '../../helpers/validator';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  sessionCookie: boolean = this.cookieService.check("sessionToken");

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  async ngOnInit(): Promise<any> {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      postcode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern("^[0-9]*$")
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      confirmEmail: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      acceptTerms: new FormControl(false, [
        Validators.requiredTrue
      ]),
    }, {
      validators: [
        Validation.emailMatch('email', 'confirmEmail'),
        Validation.passwordsMatch('password', 'confirmPassword')
      ]
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

  public get f() { return this.registerForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let firstname = this.f.firstname.value;
    let lastname = this.f.lastname.value;
    let postcode = this.f.postcode.value;
    let city = this.f.city.value;
    let email = this.f.email.value;
    let password = this.f.password.value;

    let user = {
      firstname,
      lastname,
      postcode,
      city,
      email,
      password
    };

    if (!this.registerForm.invalid) {
      try {
        let res = await Axios.post("http://localhost:3009/register", user);

        if (res.status === 201) {
          this.router.navigate(['/account/emailverification/', email]);
        }

      } catch (err) {
        this.f.email.setErrors({ alreadyExists: true });
        this.f.confirmEmail.setErrors({ alreadyExists: true });
        console.error(err.message);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

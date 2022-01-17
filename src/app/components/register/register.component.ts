import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import Axios from 'axios';
import { Router } from '@angular/router';

import Validation from '../../helpers/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastname: new FormControl('', [
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
  }

  public get f() { return this.registerForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let firstname = this.f.firstname.value;
    let lastname = this.f.lastname.value;
    let email = this.f.email.value;
    let password = this.f.password.value;

    let user = {
      firstname,
      lastname,
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

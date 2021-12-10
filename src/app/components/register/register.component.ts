import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, Form} from "@angular/forms";
import Axios from 'axios';

import Validation from '../../helpers/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

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

    let email = this.f.email.value;
    let password = this.f.password.value;

    let body = {
      email,
      password
    };

    if (!this.registerForm.invalid) {
      try {
        let result = await Axios.post("http://localhost:3009/api/v1/users", body);

        if (result.status === 201) {
          console.log(result);

          // -> redirect sur la landing page
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

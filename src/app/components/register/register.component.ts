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

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.error('Tout les champs ne sont pas correctement renseignés.');
    } else {
      console.log(this.registerForm.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

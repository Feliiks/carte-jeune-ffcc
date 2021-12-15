import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
  }

  public get f() { return this.loginForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { email, password } = this.f;

    if (!this.loginForm.invalid) {
      try {
        let result = await Axios.post("http://localhost:3009/login", {
          email: email.value,
          password: password.value
        });

        if (result.data.accessDenied === false) {
          window.location.href = '/login-success';

        } else {
          this.f.email.setErrors({ accessDenied: true });
          this.f.password.setErrors({ accessDenied: true });
        }

      } catch (err) {
        console.error(err.message);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}

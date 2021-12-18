import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordRecoveryForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    })
  }

  public get f() { return this.passwordRecoveryForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { email } = this.f;

    if (!this.passwordRecoveryForm.invalid) {
      try {
        let res = await Axios.post('http://localhost:3009/passwordrecovery', {
          email: email.value
        });

        if (res.status === 200) {
          console.log(res.status);
        }
      } catch (err) {
        this.f.email.setErrors({ accessDenied: true });
        console.error(err.message);
      }

    }
  }

  onReset() {
    this.submitted = false;
    this.passwordRecoveryForm.reset();
  }

}

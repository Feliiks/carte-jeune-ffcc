import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";

import Validation from "../../helpers/validator";

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  submitted = false;
  valid: boolean;
  edited: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    }, {
      validators: [
        Validation.passwordsMatch('password', 'confirmPassword')
      ]
    });

    let res = await Axios.post('http://localhost:3009/account/password/jwtverify', {
      token: this.route.snapshot.paramMap.get('token')
    })

    if (res.status === 200) this.valid = true;

    console.log(res.status);
  }

  public get f() { return this.newPasswordForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { password } = this.f;

    if (!this.newPasswordForm.invalid) {
      let res = await Axios.post('http://localhost:3009/account/password/getNewPassword', {
        passwordToken: this.route.snapshot.paramMap.get('token'),
        password: password.value
      });

      if (res.status === 200) this.edited = true;
    }
  }

  onReset() {
    this.submitted = false;
    this.newPasswordForm.reset();
  }

}

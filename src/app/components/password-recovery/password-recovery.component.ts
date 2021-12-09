import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
      // récupération du mot de passe

      console.log(email.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.passwordRecoveryForm.reset();
  }

}

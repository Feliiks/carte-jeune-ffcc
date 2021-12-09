import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-email-recovery',
  templateUrl: './email-recovery.component.html',
  styleUrls: ['./email-recovery.component.css']
})
export class EmailRecoveryComponent implements OnInit {
  emailRecoveryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.emailRecoveryForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])
    })
  }

  public get f() { return this.emailRecoveryForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { email } = this.f;

    if (!this.emailRecoveryForm.invalid) {
      // récupération de l'email

      console.log(email.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.emailRecoveryForm.reset();
  }

}

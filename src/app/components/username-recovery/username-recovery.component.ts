import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-email-recovery',
  templateUrl: './username-recovery.component.html',
  styleUrls: ['./username-recovery.component.css']
})
export class UsernameRecoveryComponent implements OnInit {
  usernameRecoveryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usernameRecoveryForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ])
    })
  }

  public get f() { return this.usernameRecoveryForm.controls; }

  onSubmit = async () => {
    this.submitted = true;

    let { firstname, lastname } = this.f;

    if (!this.usernameRecoveryForm.invalid) {
      // récupération de l'email

      console.log(firstname.value);
      console.log(lastname.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.usernameRecoveryForm.reset();
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-my-card',
  templateUrl: './get-my-card.component.html',
  styleUrls: ['./get-my-card.component.css'],
})

export class GetMyCardComponent implements OnInit {
  getMyCardForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getMyCardForm = new FormGroup({
      tel: new FormControl('', [
        Validators.required
      ]),
      birthdate: new FormControl('', [
        Validators.required
      ]),
      documents: new FormControl('', [
        Validators.required
      ]),
      fileSource: new FormControl('', [
        Validators.required
      ]),
      student: new FormControl(false)
    })
  }

  public get f() {
    return this.getMyCardForm.controls;
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.getMyCardForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit = async () => {
    this.submitted = true;

    let tel = this.f.tel.value;
    let birthdate = this.f.birthdate.value;
    let documents = this.f.fileSource.value;
    let student = this.f.student.value;

    let user = {
      tel,
      birthdate,
      documents,
      student
    };

    if (!this.getMyCardForm.invalid) {
      console.log(user)
    }
  }

  onReset() {
    this.submitted = false;
    this.getMyCardForm.reset();
  }

}

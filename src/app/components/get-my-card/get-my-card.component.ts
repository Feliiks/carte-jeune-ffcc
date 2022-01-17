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
  student = false;
  selectedFiles?: FileList;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMyCardForm = new FormGroup({
      tel: new FormControl('', [
        Validators.required
      ]),
      birthdate: new FormControl('', [
        Validators.required
      ]),
      student: new FormControl(false),
      documents: new FormControl('', [
        Validators.required
      ]),
    })
  }

  public get f() {
    return this.getMyCardForm.controls;
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  setUserStudent = () => {
    this.student = this.f.student.value
  }

  onSubmit = async () => {
    this.submitted = true;

    let tel = this.f.tel.value;
    let birthdate = this.f.birthdate.value;
    let documents = this.selectedFiles;
    let student = this.f.student.value;

    let user = {
      tel,
      birthdate,
      student,
      documents
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

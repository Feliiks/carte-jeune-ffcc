import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";

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
  // Données récupérées de la session de l'user
  sessionData = {
    firstname: 'Ludovic',
    lastname: 'Sobrero',
    email: 'sobrero.ludovic@gmail.com'
  };

  constructor() {}

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
      ])
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

    let user = {
      ...this.sessionData,
      tel: this.f.tel.value,
      birthdate: this.f.birthdate.value,
      documents: this.selectedFiles,
      student: this.f.student.value
    }

    if (!this.getMyCardForm.invalid) {
      try {
        let res = await Axios.post("http://localhost:3009/card/request", user);

        if (res.status === 201) {
          console.log('Demande créée !')
        }

      } catch (err) {
        console.error(err.message);
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.getMyCardForm.reset();
  }

}

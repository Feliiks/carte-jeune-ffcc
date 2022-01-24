import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";

@Component({
  selector: 'app-get-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css'],
})

export class MyCardComponent implements OnInit {
  getMyCardForm: FormGroup;
  submitted = false;
  selectedFiles?: FileList;
  student: false;
  // Données récupérées de la session de l'user
  sessionData = {
    id: 28,
    firstname: 'Ludovic',
    lastname: 'Sobrero',
    birthdate: "2001-11-28",
    student: true,
    postcode: 30000,
    city: "Nimes",
    email: 'sobrero.ludovic@gmail.com',
    youthCard: null as any
  };

  constructor() {}

  async getYouthCardFromUser() {
    try {
      let res = await Axios.post("http://localhost:3009/user/card/get", {userId: this.sessionData.id});

      if (!res.data) throw new Error()

      return this.sessionData.youthCard = res.data
    } catch {
      return null
    }
  }

  async ngOnInit(): Promise<void> {
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

    await this.getYouthCardFromUser()
  }

  getDate(dateToFormat: any) {
    let date = new Date(dateToFormat)
    return date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDay()
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

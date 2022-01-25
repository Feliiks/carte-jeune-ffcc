import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { getUserSession, getYouthCardFromUser } from "../../helpers/auth";

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
  user: any = null;
  sessionCookie: boolean = this.cookieService.check("sessionToken");

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  async ngOnInit(): Promise<any> {
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

    // Récupération de la session et carte jeune de l'user
    try {
      if (!this.sessionCookie) throw new Error();
      let sessionToken = this.cookieService.get("sessionToken");

      this.user = await getUserSession(sessionToken);
      this.user.youthCard = await getYouthCardFromUser(this.user.id);
    } catch {
      await this.router.navigate(["/connexion"]);
    }
  }

  getDate(dateToFormat: any) {
    let date = new Date(dateToFormat)
    return date.toLocaleDateString()
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
      ...this.user,
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

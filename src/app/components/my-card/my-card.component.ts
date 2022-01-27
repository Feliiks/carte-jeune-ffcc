import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Axios from "axios";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {getUserSession, getYouthCardFromUser} from "../../helpers/auth";

@Component({
  selector: 'app-get-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css'],
})

export class MyCardComponent implements OnInit {
  getMyCardForm: FormGroup;
  // Données de statut
  submitted = false;
  formValidation: any = false
  validatedRequest: boolean;
  // Données de la requête
  request: any;
  selectedFiles?: any;
  student: false;
  // Données récupérées de la session de l'user
  user: any = null;
  sessionCookie: boolean = this.cookieService.check("sessionToken");

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.getMyCardForm = new FormGroup({
      tel: new FormControl('', [
        Validators.required
      ]),
      birthdate: new FormControl('', [
        Validators.required
      ]),
      idPhoto: new FormControl('', [
        Validators.required
      ]),
      idCard: new FormControl('', [
        Validators.required
      ]),
      student: new FormControl(false),
      studentCard: new FormControl(''),
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

  selectFiles(event: any, type: any): void {
    let fileList = {...this.selectedFiles}
    fileList[type.id] = event.target.files[0]
    this.selectedFiles = fileList
  }

  setUserStudent = () => {
    this.student = this.f.student.value
  }

  onSubmit = async () => {
    this.submitted = true;

    if (!this.getMyCardForm.invalid) {
      this.request = {
        ...this.user,
        tel: this.f.tel.value,
        birthdate: this.f.birthdate.value,
        idPhoto: this.selectedFiles.idPhoto,
        idCard: this.selectedFiles.idCard,
        student: this.f.student.value,
        studentCard: this.selectedFiles.studentCard
      };
    }
  }

  onConfirm = async () => {
    try {
      this.formValidation = true

      let res = await Axios.post("http://localhost:3009/card/request", this.request);

      if (res.status !== 201) throw new Error()
      this.validatedRequest = true;

    } catch (err) {
      this.validatedRequest = false;
      console.error(err.message);
    }
  }

  onReset() {
    this.submitted = false;
    this.getMyCardForm.reset();
  }

}

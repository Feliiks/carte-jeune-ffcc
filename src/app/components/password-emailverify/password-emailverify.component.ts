import { Component, OnInit } from '@angular/core';
import Axios from "axios";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-emailverify',
  templateUrl: './password-emailverify.component.html',
  styleUrls: ['./password-emailverify.component.css']
})
export class PasswordEmailverifyComponent implements OnInit {
  display: boolean

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  sendNewMail = async () => {
    let result = await Axios.post('http://localhost:3009/account/password/sendNewMail', {
      email: this.route.snapshot.paramMap.get('email')
    });

    if (result.status === 200) {
      this.display = true;
    }
  }

}

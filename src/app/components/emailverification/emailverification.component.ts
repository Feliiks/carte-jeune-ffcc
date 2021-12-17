import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Axios from "axios";

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  display: boolean

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  sendNewMail = async () => {
    let result = await Axios.post('http://localhost:3009/account/emailverification', {
      email: this.route.snapshot.paramMap.get('email')
    });

    if (result.status === 200) {
      this.display = true;
    }
  }

}

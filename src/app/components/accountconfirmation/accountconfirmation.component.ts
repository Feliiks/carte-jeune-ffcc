import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Axios from "axios";

@Component({
  selector: 'app-accountconfirmation',
  templateUrl: './accountconfirmation.component.html',
  styleUrls: ['./accountconfirmation.component.css']
})
export class AccountconfirmationComponent implements OnInit {
  valid: boolean

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    let result = await Axios.post('http://localhost:3009/account/accountconfirmation', {
      token: this.route.snapshot.paramMap.get('token')
    });

    if (result.status === 200) this.valid = true;
  }

}

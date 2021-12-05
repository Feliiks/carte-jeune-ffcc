import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-carte-jeune',
  templateUrl: './carte-jeune.component.html',
  styleUrls: ['./carte-jeune.component.css']
})
export class CarteJeuneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let { telephone, city, photo } = form.value;

    console.log(city);
  }

}

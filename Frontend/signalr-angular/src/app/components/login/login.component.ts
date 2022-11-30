import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  userNameForm: FormGroup;

  ngOnInit(): void {
    this.userNameForm = new FormGroup({
      username: new FormControl('Mohamed'),
    });
  }

  OnSubmitUsernameForm() {}
}

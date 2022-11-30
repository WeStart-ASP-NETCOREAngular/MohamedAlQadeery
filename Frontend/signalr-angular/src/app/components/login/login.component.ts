import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  userNameForm: FormGroup;

  ngOnInit(): void {
    this.userNameForm = new FormGroup({
      username: new FormControl('Mohamed', Validators.required),
    });
  }

  OnSubmitUsernameForm() {
    const { username } = this.userNameForm.value;
    this._authService.SetUsername(username);
  }
}

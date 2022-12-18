import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  //#region FormGroup and formControls
  loginFormGroup: FormGroup;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  //#endregion

  ngOnInit(): void {
    this.InitFormControls();

    this.loginFormGroup = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl,
    });
  }

  private InitFormControls() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
  }

  HandleOnLogin() {
    console.log(this.loginFormGroup.value);
  }
}

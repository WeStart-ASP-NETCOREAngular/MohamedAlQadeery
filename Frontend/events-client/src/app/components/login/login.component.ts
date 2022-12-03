import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginResponseDto } from 'src/app/interfaces/user/ILoginResponseDto';
import { ILoginUserDto } from 'src/app/interfaces/user/ILoginUserDto';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  OnSubmitLogin() {
    this._accountService.LoginUser(this.loginForm.value).subscribe({
      next: (res: ILoginResponseDto) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

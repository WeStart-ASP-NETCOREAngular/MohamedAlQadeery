import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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

  isLoggin = false; //for spinner
  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  OnSubmitLogin() {
    this.isLoggin = true;
    this._spinner.show();
    this._accountService.LoginUser(this.loginForm.value).subscribe({
      next: (res: ILoginResponseDto) => {
        console.log(res);
        this.isLoggin = false;
        this._spinner.hide();
        this._toastr.info(`Welcome ${res.username}`, 'Login Success', {
          positionClass: 'toast-bottom-right',
        });
        if (res.role == 'admin') {
          this._router.navigate(['admin']);
        } else {
          this._router.navigate(['home']);
        }
      },
      error: (err) => {
        console.log(err);
        this._toastr.error(`Something went wrong`);

        this.isLoggin = false;
        this._spinner.hide();
      },
    });
  }
}

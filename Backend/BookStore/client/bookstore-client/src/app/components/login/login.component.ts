import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _toastr: ToastrService
  ) {}
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
    this._authService.LoginWithEmail(this.loginFormGroup.value).subscribe({
      next: (res) => {
        var returnUrl = this._activeRoute.snapshot.queryParams['returnUrl'];
        this._router.navigate([returnUrl ?? '/home']);
        this._authService.SaveToken(res);
        const email = this._authService.GetFieldFromJWT('Email');
        this._toastr.success(`اهلا بك ${email}`, 'تم تسجيل الدخول بنجاح', {
          positionClass: 'toast-top-center',
        });
      },
      error: (err: HttpErrorResponse) => {
        this._toastr.error(err.error.message, 'خطأ في تسجيل الدخول');
      },
    });
  }
}

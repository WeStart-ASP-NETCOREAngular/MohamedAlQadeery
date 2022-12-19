import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Validation from 'src/app/helpers/validation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  //#region FormGroup and formControls
  registerFormGroup: FormGroup;
  emailFormControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;
  //#endregion

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/home']);
    }
    this.InitFormControls();

    this.registerFormGroup = new FormGroup(
      {
        email: this.emailFormControl,
        firstName: this.firstNameFormControl,
        lastName: this.lastNameFormControl,
        password: this.passwordFormControl,
        confirmPassword: this.confirmPasswordFormControl,
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  private InitFormControls() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.firstNameFormControl = new FormControl('', [Validators.required]);
    this.lastNameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
  }

  HandleOnRegister() {
    console.log(this.registerFormGroup.value);
    this._authService
      .RegisterWithEmail(this.registerFormGroup.value)
      .subscribe({
        next: (res) => {
          this._router.navigate(['auth/login']);
          this._toastr.success(
            'سجل دخولك في هذه الصفحة',
            'تم تسجيل الحساب بنجاح'
          );
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this._toastr.error(err.error.errors, 'فشلت العملية');
        },
      });
  }
}
